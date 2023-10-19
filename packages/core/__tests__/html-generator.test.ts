import { HTMLGenerator } from '@/html-generator'

describe('HTMLGenerator', () => {
  test('render', () => {
    const htmlGenerator = new HTMLGenerator()

    const result = htmlGenerator.render({
      logContentList: [
        { type: 'info', content: 'info message 1', time: '2023-10-19 22:27:00' },
        { type: 'error', content: 'error message 1', time: '2023-10-19 22:27:00' },
        { type: 'info', content: 'info message 2', time: '2023-10-19 22:27:00' },
        { type: 'error', content: 'error message 2', time: '2023-10-19 22:27:00' },
        { type: 'error', content: 'error message 2', time: '2023-10-19 22:27:00' },
        { type: 'error', content: 'error message 2', time: '2023-10-19 22:27:00' },
        { type: 'error', content: 'error message 2', time: '2023-10-19 22:27:00' },
        { type: 'error', content: 'error message 2', time: '2023-10-19 22:27:00' },
        { type: 'error', content: 'error message 2', time: '2023-10-19 22:27:00' },
        { type: 'error', content: 'error message 2', time: '2023-10-19 22:27:00' },
        { type: 'error', content: 'error message 2', time: '2023-10-19 22:27:00' },
        { type: 'error', content: 'error message 2', time: '2023-10-19 22:27:00' },
      ],
      subject: 'Subject',
    })

    expect(result).toMatchInlineSnapshot(`
      "<!DOCTYPE html>
      <html lang=\\"en\\">

      <head>
        <meta charset=\\"UTF-8\\">
        <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\">
        <title>Document</title>
        <style>
          * {
            box-sizing: border-box;
          }

          html,
          body {
            margin: 0;
            padding: 0;
            background: #1e2227;
          }

          .app {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100vh;
            background: #1e2227;
            color: white;
            padding: 20px 30px;
          }

          .log-content-list {
            display: flex;
            flex-direction: column;
            gap: 16px;
            width: 100%;
            min-height: 90vh;
            padding: 20px;
          }

          .info,
          .error {
            position: relative;
            padding: 20px;
            border-radius: 10px;
            background: #23272e;
          }

          .info__title,
          .error__title {
            position: absolute;
            left: 20px;
            top: 20px;
            padding: 2px 10px;
            border-radius: 5px;
            font-size: 14px;
          }

          .info__title {
            background: #007acc;
          }

          .error__title {
            background: #e06c75;
          }

          .info__time,
          .error__time {
            position: absolute;
            right: 20px;
            top: 20px;
            background: #2c313c;
            padding: 2px 10px;
            border-radius: 5px;
            font-size: 14px;
          }

          .info__content,
          .error__content {
            margin-top: 40px;
            max-height: 500px;
            max-width: 100%;
            overflow: scroll;
            background: #1e2227;
            padding: 0 10px;
            border-radius: 10px;
          }
        </style>
      </head>

      <body>
        <div class=\\"app\\">
          <h3 class=\\"subject\\">Subject</h3>

          <div class=\\"log-content-list\\">
            <div class=\\"info\\">
              <div class=\\"info__title\\">Info</div>
              <div class=\\"info__time\\">2023-10-19 22:27:00</div>
              <div class=\\"info__content\\">
                <p>info message 1</p>
              </div>
            </div>
            <div class=\\"error\\">
              <div class=\\"error__title\\">Error</div>
              <div class=\\"error__time\\">2023-10-19 22:27:00</div>
              <div class=\\"error__content\\">
                <p>error message 1</p>
              </div>
            </div>
            <div class=\\"info\\">
              <div class=\\"info__title\\">Info</div>
              <div class=\\"info__time\\">2023-10-19 22:27:00</div>
              <div class=\\"info__content\\">
                <p>info message 2</p>
              </div>
            </div>
            <div class=\\"error\\">
              <div class=\\"error__title\\">Error</div>
              <div class=\\"error__time\\">2023-10-19 22:27:00</div>
              <div class=\\"error__content\\">
                <p>error message 2</p>
              </div>
            </div>
            <div class=\\"error\\">
              <div class=\\"error__title\\">Error</div>
              <div class=\\"error__time\\">2023-10-19 22:27:00</div>
              <div class=\\"error__content\\">
                <p>error message 2</p>
              </div>
            </div>
            <div class=\\"error\\">
              <div class=\\"error__title\\">Error</div>
              <div class=\\"error__time\\">2023-10-19 22:27:00</div>
              <div class=\\"error__content\\">
                <p>error message 2</p>
              </div>
            </div>
            <div class=\\"error\\">
              <div class=\\"error__title\\">Error</div>
              <div class=\\"error__time\\">2023-10-19 22:27:00</div>
              <div class=\\"error__content\\">
                <p>error message 2</p>
              </div>
            </div>
            <div class=\\"error\\">
              <div class=\\"error__title\\">Error</div>
              <div class=\\"error__time\\">2023-10-19 22:27:00</div>
              <div class=\\"error__content\\">
                <p>error message 2</p>
              </div>
            </div>
            <div class=\\"error\\">
              <div class=\\"error__title\\">Error</div>
              <div class=\\"error__time\\">2023-10-19 22:27:00</div>
              <div class=\\"error__content\\">
                <p>error message 2</p>
              </div>
            </div>
            <div class=\\"error\\">
              <div class=\\"error__title\\">Error</div>
              <div class=\\"error__time\\">2023-10-19 22:27:00</div>
              <div class=\\"error__content\\">
                <p>error message 2</p>
              </div>
            </div>
            <div class=\\"error\\">
              <div class=\\"error__title\\">Error</div>
              <div class=\\"error__time\\">2023-10-19 22:27:00</div>
              <div class=\\"error__content\\">
                <p>error message 2</p>
              </div>
            </div>
            <div class=\\"error\\">
              <div class=\\"error__title\\">Error</div>
              <div class=\\"error__time\\">2023-10-19 22:27:00</div>
              <div class=\\"error__content\\">
                <p>error message 2</p>
              </div>
            </div>
          </div>

        </div>
      </body>

      </html>
      "
    `)
  })
})
