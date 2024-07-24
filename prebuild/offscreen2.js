async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true }
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions)
  return tab
}
chrome.runtime.onMessage.addListener(async message => {
  if (message.target === 'offscreen2') {
    switch (message.type) {
      case 'start-recording-all':
        startRecording(message.data)
        break
      case 'stop-recording-all':
        stopRecording()
        break
      default:
        throw new Error('Unrecognized message:', message.type)
    }
  }
})

let recorder
let data = []

async function startRecording(streamId) {
  if (recorder?.state === 'recording') {
    throw new Error('Called startRecording while recording is in progress.')
  }
  console.log('offscreen2', streamId, recorder)
  const media = await navigator.mediaDevices.getUserMedia({
    video: {
      mandatory: {
        // chromeMediaSource: 'desktop',
        chromeMediaSourceId: streamId
      }
    }
  })

  try {
    console.log(1)
    const output = new AudioContext()
    const source = output.createMediaStreamSource(media)
    source.connect(output.destination)

    console.log(2)
    // Start recording.
    recorder = new MediaRecorder(media, { mimeType: 'video/webm' })
    recorder.ondataavailable = event => data.push(event.data)
    recorder.onstop = async () => {
      const blob = new Blob(data, { type: 'video/webm' })

      chrome.runtime.sendMessage({
        type: 'preview',
        url: URL.createObjectURL(blob)
      })

      // window.open(URL.createObjectURL(blob), '_blank')
      recorder = undefined
      data = []
    }

    console.log(3)
    recorder.start()
    window.location.hash = 'recording'
  } catch (err) {
    console.log('errrrr', err)
  }
}

async function stopRecording() {
  recorder.stop()

  // Stopping the tracks makes sure the recording icon in the tab is removed.
  recorder.stream.getTracks().forEach(t => t.stop())

  // Update current state in URL
  window.location.hash = ''

  // Note: In a real extension, you would want to write the recording to a more
  // permanent location (e.g IndexedDB) and then close the offscreen document,
  // to avoid keeping a document around unnecessarily. Here we avoid that to
  // make sure the browser keeps the Object URL we create (see above) and to
  // keep the sample fairly simple to follow.
}
