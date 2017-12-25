var os = require('os')
var fs = require('fs')
var path = require('path')
var pump = require('pump')

const HOME_DIR = os.homedir()
const DOWNLOAD_FOLDER = `${HOME_DIR}/Downloads`
const MUSIC_INBOX = `${HOME_DIR}/Vibedrive/Inbox`
const EXTENSIONS = [ 'mp3', 'wav' ]

var files = fs.readdirSync(DOWNLOAD_FOLDER)

files.forEach(file => {
  var filePath = path.join(DOWNLOAD_FOLDER, file)
  var stats = fs.statSync(filePath)
  var extension = (file.split('.').slice(-1)[0] + '').toLowerCase()

  if (stats.isFile() && EXTENSIONS.includes(extension)) {
    var source = fs.createReadStream(filePath)
    var dest = fs.createWriteStream(path.join(MUSIC_INBOX, file))

    pump(source, dest, function (err) {
      if (err) { return console.error(err) }

      fs.unlinkSync(filePath)
    })
  }
})
