// A simulated CI/CD pipeline for this portfolio: stage model + a pure reducer.
// Randomness arrives in the tick action so the reducer stays pure (StrictMode runs reducers twice).

export type Mode = 'legacy' | 'optimised'
export type Chaos = { flaky: boolean; typeError: boolean; badHealth: boolean }
export type StageId = 'checkout' | 'install' | 'lint' | 'typecheck' | 'test' | 'build' | 'docker' | 'deploy' | 'health' | 'rollback'
export type StageStatus = 'idle' | 'pending' | 'running' | 'success' | 'failed' | 'skipped'
export type RunStatus = 'idle' | 'running' | 'success' | 'failed' | 'rolled-back'
export type LogLevel = 'cmd' | 'info' | 'ok' | 'error'

type Ctx = { run: number; version: string; live: string; sha: string; mode: Mode }
type Stage = {
  id: StageId
  name: string
  seconds: Record<Mode, number>
  deps: Record<Mode, StageId[]>
  /** Lines streamed while the stage runs. */
  logs: (ctx: Ctx) => string[]
  /** Lines printed if the stage fails. */
  failLogs?: (ctx: Ctx) => string[]
}

// Real sim-time = real time × TIME_SCALE (1 real second = 20 simulated seconds).
export const TIME_SCALE = 20
export const FIRST_RUN = 218
const MAX_STEP = 1 // simulated seconds per reducer step

export const stages: Stage[] = [
  {
    id: 'checkout',
    name: 'Checkout',
    seconds: { legacy: 8, optimised: 8 },
    deps: { legacy: [], optimised: [] },
    logs: (c) => ['$ git fetch origin main --depth=1', `HEAD is now at ${c.sha} (main)`],
  },
  {
    id: 'install',
    name: 'Install deps',
    seconds: { legacy: 55, optimised: 12 },
    deps: { legacy: ['checkout'], optimised: ['checkout'] },
    logs: (c) =>
      c.mode === 'optimised'
        ? ['$ npm ci --prefer-offline', 'cache hit: ~/.npm (key: package-lock.json)', 'dependencies restored from cache']
        : ['$ npm ci', 'cache miss: downloading packages from registry…', 'dependencies installed'],
  },
  {
    id: 'lint',
    name: 'Lint',
    seconds: { legacy: 25, optimised: 25 },
    deps: { legacy: ['install'], optimised: ['install'] },
    logs: () => ['$ oxlint', 'Found 0 warnings and 0 errors.'],
  },
  {
    id: 'typecheck',
    name: 'Typecheck',
    seconds: { legacy: 30, optimised: 30 },
    deps: { legacy: ['lint'], optimised: ['install'] },
    logs: () => ['$ tsc -b'],
    failLogs: () => [
      "src/components/Hero.tsx:42:7 - error TS2322: Type 'number' is not assignable to type 'string'.",
      'Found 1 error.',
    ],
  },
  {
    id: 'test',
    name: 'Unit tests',
    seconds: { legacy: 60, optimised: 60 },
    deps: { legacy: ['typecheck'], optimised: ['install'] },
    logs: () => ['$ vitest run', '✓ src/data/portfolio.test.ts (6 tests)', '✓ src/components/Projects.test.tsx (8 tests)'],
    failLogs: () => [
      '✗ src/components/Terminal.test.tsx > runs `hanumant --status`',
      '  Error: Test timed out in 5000ms (flaky: passes on retry)',
      'Tests  1 failed | 14 passed',
    ],
  },
  {
    id: 'build',
    name: 'Build',
    seconds: { legacy: 45, optimised: 35 },
    deps: { legacy: ['test'], optimised: ['lint', 'typecheck', 'test'] },
    logs: () => [
      '$ vite build',
      'dist/assets/index.js      279.11 kB │ gzip:  86.09 kB',
      'dist/assets/CyberCore.js  537.57 kB │ gzip: 134.13 kB',
    ],
  },
  {
    id: 'docker',
    name: 'Docker image',
    seconds: { legacy: 95, optimised: 40 },
    deps: { legacy: ['build'], optimised: ['build'] },
    logs: (c) =>
      c.mode === 'optimised'
        ? [
            `$ docker build --cache-from app:latest -t app:${c.version} .`,
            '#1 [deps 1/3] RUN npm ci  CACHED',
            '#2 [build 2/3] RUN npm run build  CACHED',
            '#3 [serve 3/3] COPY dist /usr/share/nginx/html',
            `$ docker push ecr/app:${c.version}  (2 layers reused)`,
          ]
        : [
            `$ docker build -t app:${c.version} .`,
            '#1 [deps 1/3] RUN npm ci',
            '#2 [build 2/3] RUN npm run build',
            '#3 [serve 3/3] COPY dist /usr/share/nginx/html',
            `$ docker push ecr/app:${c.version}`,
          ],
  },
  {
    id: 'deploy',
    name: 'Deploy to ECS',
    seconds: { legacy: 60, optimised: 60 },
    deps: { legacy: ['docker'], optimised: ['docker'] },
    logs: (c) => [
      '$ aws ecs update-service --service portfolio --force-new-deployment',
      `rolling update: task 1/3 → app:${c.version}`,
      `rolling update: task 2/3 → app:${c.version}`,
      `rolling update: task 3/3 → app:${c.version}`,
      'service reached steady state',
    ],
  },
  {
    id: 'health',
    name: 'Health check',
    seconds: { legacy: 15, optimised: 15 },
    deps: { legacy: ['deploy'], optimised: ['deploy'] },
    logs: () => ['$ curl -fsS $APP_URL/healthz'],
    failLogs: () => ['503 Service Unavailable', 'health check failed (3/3 attempts)'],
  },
  {
    id: 'rollback',
    name: 'Auto-rollback',
    seconds: { legacy: 30, optimised: 30 },
    deps: { legacy: [], optimised: [] },
    logs: (c) => [
      `rolling back to app:${c.live}`,
      `task 1/3 → app:${c.live}`,
      `task 2/3 → app:${c.live}`,
      `task 3/3 → app:${c.live}`,
    ],
  },
]

export const stageById = Object.fromEntries(stages.map((s) => [s.id, s])) as Record<StageId, Stage>
const PIPELINE: StageId[] = ['checkout', 'install', 'lint', 'typecheck', 'test', 'build', 'docker', 'deploy', 'health']

/** Longest dependency path, i.e. how long a clean run takes in this mode. */
export function estimate(mode: Mode) {
  const memo = new Map<StageId, number>()
  const finish = (id: StageId): number => {
    if (!memo.has(id)) {
      const s = stageById[id]
      memo.set(id, s.seconds[mode] + Math.max(0, ...s.deps[mode].map(finish)))
    }
    return memo.get(id)!
  }
  return finish('health')
}

export const formatClock = (seconds: number) => {
  const s = Math.floor(seconds)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

const shaFor = (run: number) => ((run * 2654435761) >>> 0).toString(16).padStart(8, '0').slice(0, 7)
const versionFor = (run: number) => `v1.${run}`

// ---------------------------------------------------------------------------------------------

type StageState = { status: StageStatus; elapsed: number; logged: number; willFail: boolean }
export type LogLine = { id: number; t: number; stage: StageId; text: string; level: LogLevel }
export type HistoryEntry = { run: number; mode: Mode; kind: 'deploy' | 'rollback'; status: RunStatus; seconds: number; version: string }

export type State = {
  run: number
  kind: 'deploy' | 'rollback'
  mode: Mode
  chaos: Chaos
  runStages: StageId[]
  stages: Record<StageId, StageState>
  runStatus: RunStatus
  clock: number
  logs: LogLine[]
  logSeq: number
  live: string
  previous: string | null
  target: string
  tasks: string[]
  history: HistoryEntry[]
}

export type Action =
  | { type: 'deploy'; mode: Mode; chaos: Chaos }
  | { type: 'rollback' }
  | { type: 'retry'; chaos: Chaos }
  | { type: 'reset' }
  | { type: 'tick'; dt: number; rand: number }

const idleStages = () =>
  Object.fromEntries(stages.map((s) => [s.id, { status: 'idle', elapsed: 0, logged: 0, willFail: false }])) as Record<
    StageId,
    StageState
  >

export function initialState(): State {
  const live = versionFor(FIRST_RUN - 1)
  return {
    run: FIRST_RUN - 1,
    kind: 'deploy',
    mode: 'optimised',
    chaos: { flaky: false, typeError: false, badHealth: false },
    runStages: [],
    stages: idleStages(),
    runStatus: 'idle',
    clock: 0,
    logs: [],
    logSeq: 0,
    live,
    previous: null,
    target: live,
    tasks: [live, live, live],
    history: [],
  }
}

function startRun(state: State, kind: 'deploy' | 'rollback', mode: Mode, chaos: Chaos, target: string): State {
  const runStages: StageId[] = kind === 'deploy' ? PIPELINE : ['deploy', 'health']
  const fresh = idleStages()
  for (const id of runStages) fresh[id].status = 'pending'
  return {
    ...state,
    run: state.run + 1,
    kind,
    mode,
    chaos,
    runStages,
    stages: fresh,
    runStatus: 'running',
    clock: 0,
    logs: [],
    target,
  }
}

const ctxOf = (s: State): Ctx => ({ run: s.run, version: s.target, live: s.live, sha: shaFor(s.run), mode: s.mode })

/** Stages in this run that (transitively) depend on `id`. */
function dependentsOf(state: State, id: StageId): StageId[] {
  const out = new Set<StageId>()
  let grew = true
  while (grew) {
    grew = false
    for (const sid of state.runStages) {
      if (out.has(sid)) continue
      const deps = stageById[sid].deps[state.mode]
      if (deps.includes(id) || deps.some((d) => out.has(d))) {
        out.add(sid)
        grew = true
      }
    }
  }
  return [...out]
}

function tick(prev: State, dt: number, rand: number): State {
  const state: State = { ...prev, stages: { ...prev.stages }, logs: [...prev.logs] }
  const ctx = ctxOf(state)
  state.clock += dt

  const log = (stage: StageId, text: string, level?: LogLevel) => {
    state.logs.push({
      id: state.logSeq++,
      t: state.clock,
      stage,
      text,
      level: level ?? (text.startsWith('$') ? 'cmd' : 'info'),
    })
  }
  const set = (id: StageId, patch: Partial<StageState>) => {
    state.stages[id] = { ...state.stages[id], ...patch }
  }

  // 1. Advance running stages.
  for (const id of [...state.runStages]) {
    const st = state.stages[id]
    if (st.status !== 'running') continue
    const def = stageById[id]
    const duration = def.seconds[state.mode]
    const elapsed = Math.min(st.elapsed + dt, duration)
    const lines = def.logs(ctx)
    const due = Math.min(lines.length, Math.floor((elapsed / duration) * lines.length) + 1)
    for (let i = st.logged; i < due; i++) log(id, lines[i])
    set(id, { elapsed, logged: due })

    // ECS task squares follow the deploy / rollback progress.
    if (id === 'deploy' || id === 'rollback') {
      const from = id === 'deploy' ? state.live : state.target
      const to = id === 'deploy' ? state.target : state.live
      const flipped = Math.min(3, Math.floor((elapsed / duration) * 3.2))
      state.tasks = [0, 1, 2].map((i) => (i < flipped ? to : from))
    }

    if (elapsed < duration) continue
    if (st.willFail) {
      for (const line of def.failLogs?.(ctx) ?? []) log(id, line, 'error')
      log(id, `✗ ${def.name} failed after ${formatClock(duration)}`, 'error')
      set(id, { status: 'failed' })
      for (const dep of dependentsOf(state, id)) set(dep, { status: 'skipped' })
      if (id === 'health' && state.kind === 'deploy') {
        log('rollback', `health check failed → starting automatic rollback to app:${state.live}`, 'error')
        state.runStages = [...state.runStages, 'rollback']
        set('rollback', { status: 'running', elapsed: 0, logged: 0, willFail: false })
      }
    } else {
      if (id === 'health') log(id, '200 OK in 38ms', 'ok')
      log(id, `✓ ${def.name} (${formatClock(duration)})`, 'ok')
      set(id, { status: 'success' })
    }
  }

  // 2. Start pending stages whose dependencies (within this run) have all succeeded.
  for (const id of state.runStages) {
    if (state.stages[id].status !== 'pending') continue
    const deps = stageById[id].deps[state.mode].filter((d) => state.runStages.includes(d))
    if (!deps.every((d) => state.stages[d].status === 'success')) continue
    const chaos = state.kind === 'deploy' ? state.chaos : { flaky: false, typeError: false, badHealth: false }
    const willFail =
      (id === 'typecheck' && chaos.typeError) || (id === 'test' && chaos.flaky && rand < 0.5) || (id === 'health' && chaos.badHealth)
    set(id, { status: 'running', elapsed: 0, logged: 0, willFail })
  }

  // 3. Finish the run once nothing is pending or running.
  const active = state.runStages.some((id) => ['pending', 'running'].includes(state.stages[id].status))
  if (active) return state

  let status: RunStatus
  if (state.stages.rollback.status === 'success') {
    status = 'rolled-back'
    state.tasks = [state.live, state.live, state.live]
    log('rollback', `✓ rolled back — production still on app:${state.live}`, 'ok')
  } else if (state.runStages.some((id) => state.stages[id].status === 'failed')) {
    status = 'failed'
  } else {
    status = 'success'
    state.previous = state.live
    state.live = state.target
    state.tasks = [state.live, state.live, state.live]
    log('health', `🚀 app:${state.live} is live`, 'ok')
  }
  state.runStatus = status
  const entry: HistoryEntry = { run: state.run, mode: state.mode, kind: state.kind, status, seconds: state.clock, version: state.target }
  // A retried run replaces its own earlier (failed) history entry.
  state.history = [entry, ...state.history.filter((h) => h.run !== state.run)].slice(0, 6)
  return state
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'deploy':
      if (state.runStatus === 'running') return state
      return startRun(state, 'deploy', action.mode, action.chaos, versionFor(state.run + 1))
    case 'rollback':
      if (state.runStatus === 'running' || !state.previous) return state
      return startRun(state, 'rollback', state.mode, state.chaos, state.previous)
    case 'retry': {
      if (state.runStatus !== 'failed') return state
      const stagesNext = { ...state.stages }
      for (const id of state.runStages) {
        if (['failed', 'skipped'].includes(stagesNext[id].status)) {
          stagesNext[id] = { status: 'pending', elapsed: 0, logged: 0, willFail: false }
        }
      }
      return { ...state, chaos: action.chaos, stages: stagesNext, runStatus: 'running' }
    }
    case 'reset':
      return state.runStatus === 'running' ? state : initialState()
    case 'tick': {
      // Step in small slices so a large dt (throttled background tab) doesn't lose time at stage hand-offs.
      let next = state
      let remaining = action.dt
      while (remaining > 0 && next.runStatus === 'running') {
        const step = Math.min(remaining, MAX_STEP)
        next = tick(next, step, action.rand)
        remaining -= step
      }
      return next
    }
  }
}
