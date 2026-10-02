import { useEffect, useReducer } from 'react'
import { initialState, reducer, TIME_SCALE, type Chaos, type Mode } from './pipeline'

const TICK_MS = 100

export function usePipeline() {
  const [state, dispatch] = useReducer(reducer, undefined, initialState)
  const running = state.runStatus === 'running'

  // Drive the simulation from wall-clock deltas so throttled/background tabs stay accurate.
  useEffect(() => {
    if (!running) return
    let last = performance.now()
    const id = window.setInterval(() => {
      const now = performance.now()
      const dt = (Math.min(now - last, 1000) / 1000) * TIME_SCALE
      last = now
      dispatch({ type: 'tick', dt, rand: Math.random() })
    }, TICK_MS)
    return () => window.clearInterval(id)
  }, [running])

  return {
    state,
    deploy: (mode: Mode, chaos: Chaos) => dispatch({ type: 'deploy', mode, chaos }),
    retry: (chaos: Chaos) => dispatch({ type: 'retry', chaos }),
    rollback: () => dispatch({ type: 'rollback' }),
    reset: () => dispatch({ type: 'reset' }),
  }
}
