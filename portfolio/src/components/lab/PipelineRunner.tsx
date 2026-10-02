import {
  ChevronDown,
  ChevronRight,
  Circle,
  CircleCheck,
  CircleDashed,
  CircleMinus,
  CircleX,
  History,
  LoaderCircle,
  RefreshCw,
  RotateCcw,
  Rocket,
  Server,
  Timer,
  Undo2,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import {
  estimate,
  formatClock,
  stageById,
  type Chaos,
  type LogLine,
  type Mode,
  type RunStatus,
  type StageId,
  type StageStatus,
} from './pipeline'
import { usePipeline } from './usePipeline'

const columns: StageId[][] = [['checkout'], ['install'], ['lint', 'typecheck', 'test'], ['build'], ['docker'], ['deploy'], ['health']]

const EST = { legacy: estimate('legacy'), optimised: estimate('optimised') }
const SAVING = Math.round((1 - EST.optimised / EST.legacy) * 100)

const chaosOptions: { key: keyof Chaos; label: string }[] = [
  { key: 'flaky', label: 'Flaky test' },
  { key: 'typeError', label: 'Type error' },
  { key: 'badHealth', label: 'Bad health check' },
]

const runBadge: Record<RunStatus, { label: string; className: string }> = {
  idle: { label: 'IDLE', className: 'bg-surface-container-highest text-on-surface-variant' },
  running: { label: 'RUNNING', className: 'bg-primary-container/15 text-primary-container' },
  success: { label: 'SUCCESS', className: 'bg-tertiary-container/15 text-tertiary-container' },
  failed: { label: 'FAILED', className: 'bg-error/15 text-error' },
  'rolled-back': { label: 'ROLLED BACK', className: 'bg-secondary-container/50 text-secondary' },
}

const statusStyle: Record<StageStatus, string> = {
  idle: 'bg-surface-container-low text-outline opacity-60',
  pending: 'bg-surface-container-low text-on-surface-variant',
  running: 'bg-surface-container text-primary-container ring-1 ring-primary-container/70',
  success: 'bg-surface-container-low text-tertiary-container',
  failed: 'bg-error/10 text-error ring-1 ring-error/60',
  skipped: 'bg-surface-container-low text-outline opacity-50',
}

const logColor: Record<LogLine['level'], string> = {
  cmd: 'text-primary-container',
  info: 'text-on-surface-variant',
  ok: 'text-tertiary-container',
  error: 'text-error',
}

function StatusIcon({ status }: { status: StageStatus }) {
  const cls = 'size-4 shrink-0'
  switch (status) {
    case 'running':
      return <LoaderCircle className={`${cls} motion-safe:animate-spin`} />
    case 'success':
      return <CircleCheck className={cls} />
    case 'failed':
      return <CircleX className={cls} />
    case 'skipped':
      return <CircleMinus className={cls} />
    case 'pending':
      return <Circle className={cls} />
    default:
      return <CircleDashed className={cls} />
  }
}

export default function PipelineRunner() {
  const { state, deploy, retry, rollback, reset } = usePipeline()
  const [mode, setMode] = useState<Mode>('optimised')
  const [chaos, setChaos] = useState<Chaos>({ flaky: false, typeError: false, badHealth: false })
  const [filter, setFilter] = useState<StageId | null>(null)
  const logRef = useRef<HTMLDivElement>(null)

  const running = state.runStatus === 'running'
  const visibleLogs = filter ? state.logs.filter((l) => l.stage === filter) : state.logs

  useEffect(() => {
    const el = logRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [visibleLogs.length])

  const runningNames = state.runStages.filter((id) => state.stages[id].status === 'running').map((id) => stageById[id].name)
  const announcement = running
    ? `Pipeline #${state.run} running: ${runningNames.join(', ')}`
    : state.runStatus === 'idle'
      ? ''
      : `Pipeline #${state.run} ${runBadge[state.runStatus].label.toLowerCase()}`

  // compact = single-line row, used for the phone layout.
  const stageNode = (id: StageId, compact = false) => {
    const st = state.stages[id]
    const def = stageById[id]
    const duration = def.seconds[state.runStatus === 'idle' ? mode : state.mode]
    const progress = st.status === 'running' ? st.elapsed / duration : ['success', 'failed'].includes(st.status) ? 1 : 0
    const time =
      st.status === 'running' ? formatClock(st.elapsed) : st.status === 'success' || st.status === 'failed' ? formatClock(duration) : `~${formatClock(duration)}`
    return (
      <button
        key={id}
        type="button"
        onClick={() => setFilter((f) => (f === id ? null : id))}
        aria-pressed={filter === id}
        title="Filter logs to this stage"
        className={`relative flex w-full min-w-0 overflow-hidden rounded-lg px-3 text-left transition-colors hover:brightness-125 ${
          compact ? 'min-h-10 items-center justify-between gap-3 py-2' : 'flex-col gap-1 py-2.5'
        } ${statusStyle[st.status]} ${
          filter === id ? 'outline-2 outline-secondary' : ''
        }`}
      >
        <span className="flex items-center gap-2">
          <StatusIcon status={st.status} />
          <span className="truncate font-mono text-code-sm font-semibold text-on-surface">{def.name}</span>
        </span>
        <span className={`font-mono text-label-sm ${compact ? 'shrink-0' : 'pl-6'}`}>{st.status === 'skipped' ? 'skipped' : time}</span>
        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-surface-container-highest">
          <span className="block h-full bg-current transition-[width] duration-100" style={{ width: `${progress * 100}%` }} />
        </span>
      </button>
    )
  }

  return (
    <div className="theme-dark overflow-hidden rounded-xl bg-surface-container-lowest shadow-2xl">
      {/* Title bar */}
      <div className="flex items-center justify-between gap-3 bg-surface-container-high px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="size-2.5 shrink-0 rounded-full bg-error/80" />
          <span className="size-2.5 shrink-0 rounded-full bg-secondary/80" />
          <span className="size-2.5 shrink-0 rounded-full bg-tertiary-container/80" />
          <span className="ml-2 truncate font-mono text-label-sm text-on-surface">
            ci // portfolio · pipeline #{state.runStatus === 'idle' ? state.run + 1 : state.run}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className={`rounded px-2 py-0.5 font-mono text-label-sm ${runBadge[state.runStatus].className}`}>
            {runBadge[state.runStatus].label}
          </span>
          <span className="hidden rounded bg-secondary-container/60 px-2 py-0.5 font-mono text-label-sm text-on-secondary-container sm:inline">
            SIMULATION
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4 border-b border-surface-container-high p-4 sm:p-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
          <fieldset className="flex flex-col gap-1.5" disabled={running}>
            <legend className="mb-1.5 font-mono text-label-sm text-on-surface-variant uppercase">Pipeline</legend>
            <div className="flex rounded-lg bg-surface-container p-1">
              {(['legacy', 'optimised'] as Mode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  aria-pressed={mode === m}
                  onClick={() => setMode(m)}
                  className={`flex min-h-10 flex-1 flex-col items-center justify-center rounded-md px-4 py-1 font-mono transition-colors disabled:cursor-not-allowed ${
                    mode === m ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="text-label-md uppercase">{m}</span>
                  <span className="text-label-sm opacity-80">~{formatClock(EST[m])}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="flex flex-col" disabled={running}>
            <legend className="mb-1.5 font-mono text-label-sm text-on-surface-variant uppercase">Break something</legend>
            <div className="flex flex-wrap gap-2">
              {chaosOptions.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  aria-pressed={chaos[c.key]}
                  onClick={() => setChaos((prev) => ({ ...prev, [c.key]: !prev[c.key] }))}
                  className={`min-h-9 rounded-full px-4 py-1.5 font-mono text-label-md whitespace-nowrap transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                    chaos[c.key]
                      ? 'bg-error/20 text-error ring-1 ring-error/50'
                      : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-bright hover:text-on-surface'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex">
          <button
            type="button"
            onClick={() => {
              setFilter(null)
              deploy(mode, chaos)
            }}
            disabled={running}
            className="col-span-2 flex min-h-10 items-center justify-center gap-2 rounded bg-primary-container px-5 py-2 font-mono text-label-md font-semibold text-on-primary-container shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-shadow hover:shadow-[0_0_28px_rgba(0,240,255,0.6)] disabled:opacity-50 disabled:shadow-none"
          >
            <Rocket className="size-4" /> DEPLOY
          </button>
          <button
            type="button"
            onClick={() => retry(chaos)}
            disabled={state.runStatus !== 'failed'}
            className="flex min-h-10 items-center justify-center gap-2 rounded bg-surface-container-high px-4 py-2 font-mono text-label-md text-on-surface transition-colors hover:bg-surface-bright disabled:opacity-40"
          >
            <RefreshCw className="size-4" /> RETRY
          </button>
          <button
            type="button"
            onClick={() => {
              setFilter(null)
              rollback()
            }}
            disabled={running || !state.previous}
            className="flex min-h-10 items-center justify-center gap-2 rounded bg-secondary-container/40 px-4 py-2 font-mono text-label-md text-secondary-fixed transition-colors hover:bg-secondary-container/60 disabled:opacity-40"
          >
            <Undo2 className="size-4" /> ROLLBACK
          </button>
          <button
            type="button"
            onClick={() => {
              setFilter(null)
              reset()
            }}
            disabled={running || state.runStatus === 'idle'}
            className="col-span-2 flex min-h-10 items-center justify-center gap-2 rounded bg-surface-container-high px-4 py-2 font-mono text-label-md text-on-surface transition-colors hover:bg-surface-bright disabled:opacity-40 sm:col-span-1"
          >
            <RotateCcw className="size-4" /> RESET
          </button>
        </div>
      </div>

      {/* Stage graph: columns on desktop, a vertical list on phones */}
      <div className="border-b border-surface-container-high p-4 sm:p-6">
        <div className="hidden items-center gap-1.5 md:flex">
          {columns.map((col, i) => (
            <div key={i} className="flex min-w-0 flex-1 items-center gap-1.5">
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                {col.length > 1 && (
                  <span className="text-center font-mono text-label-sm text-outline uppercase">
                    {(state.runStatus === 'idle' ? mode : state.mode) === 'optimised' ? 'parallel' : 'sequential'}
                  </span>
                )}
                {col.map((id) => stageNode(id))}
                {/* The rollback node hangs under the health check so the row keeps 7 columns. */}
                {col.includes('health') && state.stages.rollback.status !== 'idle' && (
                  <>
                    <ChevronDown className="mx-auto size-3.5 text-error" />
                    {stageNode('rollback')}
                  </>
                )}
              </div>
              {i < columns.length - 1 && <ChevronRight className="size-4 shrink-0 text-outline" />}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1.5 md:hidden">
          {columns.flat().map((id) => stageNode(id, true))}
          {state.stages.rollback.status !== 'idle' && stageNode('rollback', true)}
        </div>
      </div>

      {/* Logs + side panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="flex min-w-0 flex-col border-b border-surface-container-high lg:col-span-2 lg:border-r lg:border-b-0">
          <div className="flex items-center justify-between px-4 pt-3 sm:px-6">
            <span className="font-mono text-label-sm text-on-surface-variant uppercase">
              Logs{filter && <> · {stageById[filter].name}</>}
            </span>
            {filter && (
              <button
                type="button"
                onClick={() => setFilter(null)}
                className="flex min-h-9 items-center gap-1 font-mono text-label-sm text-primary"
              >
                <X className="size-3.5" /> show all
              </button>
            )}
          </div>
          <div ref={logRef} className="h-[260px] overflow-y-auto px-4 py-3 font-mono text-code-sm sm:px-6 lg:h-[300px]">
            {visibleLogs.length === 0 ? (
              <p className="text-outline">
                {state.runStatus === 'idle' ? 'Press DEPLOY to ship this portfolio (in simulation).' : 'No output for this stage yet.'}
              </p>
            ) : (
              visibleLogs.map((l) => (
                <div key={l.id} className="flex gap-2 leading-relaxed">
                  <span className="shrink-0 text-outline">[{formatClock(l.t)}]</span>
                  <span className="hidden w-20 shrink-0 truncate text-secondary sm:inline">{l.stage}</span>
                  <span className={`min-w-0 break-words ${logColor[l.level]}`}>{l.text}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <aside className="flex flex-col gap-5 p-4 font-mono text-code-sm sm:p-6">
          <div>
            <h3 className="mb-2 flex items-center gap-1.5 text-label-sm text-on-surface-variant uppercase">
              <Server className="size-3.5" /> Production · ECS
            </h3>
            <p className="mb-2 text-on-surface">
              live: <span className="text-tertiary-container">app:{state.live}</span>
              {running && state.target !== state.live && (
                <span className="text-primary-container"> → app:{state.target}</span>
              )}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {state.tasks.map((v, i) => (
                <div
                  key={i}
                  className={`rounded px-2 py-2 text-center text-label-sm transition-colors duration-300 ${
                    v === state.live
                      ? 'bg-tertiary-container/15 text-tertiary-container'
                      : 'bg-primary-container/20 text-primary-container'
                  }`}
                >
                  task {i + 1}
                  <br />
                  {v}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 flex items-center gap-1.5 text-label-sm text-on-surface-variant uppercase">
              <Timer className="size-3.5" /> Run time (simulated)
            </h3>
            <p className="text-code-lg text-on-surface">{formatClock(state.clock)}</p>
            <p className="text-label-sm text-outline">
              optimised ~{formatClock(EST.optimised)} vs legacy ~{formatClock(EST.legacy)} ·{' '}
              <span className="text-tertiary-container">−{SAVING}%</span>
            </p>
          </div>

          <div>
            <h3 className="mb-2 flex items-center gap-1.5 text-label-sm text-on-surface-variant uppercase">
              <History className="size-3.5" /> History
            </h3>
            {state.history.length === 0 ? (
              <p className="text-outline">No runs yet.</p>
            ) : (
              <ul className="space-y-1">
                {state.history.map((h) => (
                  <li key={h.run} className="flex justify-between gap-2">
                    <span className="truncate">
                      <span className={runBadge[h.status].className.split(' ').pop()}>
                        {h.status === 'success' ? '✓' : h.status === 'failed' ? '✗' : '↺'}
                      </span>{' '}
                      #{h.run} {h.kind === 'rollback' ? `rollback → ${h.version}` : h.mode}
                    </span>
                    <span className="shrink-0 text-outline">{formatClock(h.seconds)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>

      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </div>
  )
}
