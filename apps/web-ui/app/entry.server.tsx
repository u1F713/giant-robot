import type { EntryContext } from '@remix-run/node'
import { PassThrough } from 'stream'
import { Response } from '@remix-run/node'
import { RemixServer } from '@remix-run/react'
import { renderToPipeableStream } from 'react-dom/server'

const ABORT_DELAY = 5000

const handleRequest = async (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
): Promise<unknown> => {
  return await new Promise((resolve, reject) => {
    let didError = false

    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        onShellReady: () => {
          const body = new PassThrough()

          responseHeaders.set('Content-Type', 'text/html')

          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode
            })
          )

          pipe(body)
        },
        onShellError: err => {
          reject(err)
        },
        onError: error => {
          didError = true

          console.error(error)
        }
      }
    )

    setTimeout(abort, ABORT_DELAY)
  })
}

export default handleRequest
