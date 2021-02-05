// Based on Justin Taylor's post
// http://justintaylor.tv/after-effects-command-ids/

// Written in Adobe Extendscript (ES3)
// USE: `app.executeCommand(Cmd.SCRIPTS_EXPRESSIONS)`

var Cmd = (function () {
	function readFile(filePath, encoding) {
		var file = new File(filePath)
		var contents
		encoding = encoding || 'UTF-8'
		if (file.exists) {
			if (File.isEncodingAvailable(encoding)) {
				file.encoding = encoding
			}
			file.open()
			contents = file.read()
			file.close()
			return contents
		}
		return null
	}

	function camelToSnake(string) {
		var arr = string.split(/[\w]([0-9]+|[A-Z]|[a-z]+|[0-9]+)/g)
		var len = arr.length
		for (var i = 0; i < len; i++) {
			arr[i] && arr.push(arr[i])
		}
		arr.splice(0, len)
		return arr.join('_').toUpperCase()
	}

	function alertAsJSON(obj) {
		var arr = []
		for (var key in obj) {
			arr.push("\"" + key + "\": " + obj[key])
		}
		var json = "{" + arr.join(',') + "}"
		alert(json)
	}

	var appPath = BridgeTalk.getAppPath('aftereffects')
	var isMac = system.osName === 'MacOS'
	var filePath = [
		appPath,
		isMac ? 'Contents' : 'Support Files',
		'Dictionaries',
		'es_ES',
		'after_effects_es_ES.dat',
	].join('/')
	var file = readFile(filePath)
	var lines = file.split('\n')
	var commands = {}
	var i, len = lines.length
	for (i = 0; i < len; i++) {
		var line = lines[i]
		var isMenuID = line.indexOf('/MenuID') != -1
		if (isMenuID) {
			line = line.substring(line.lastIndexOf('/') + 1)
			var data = line.match(/[a-z|A-Z|0-9]*\_[0-9]*/g)
			if (data) {
				var name = data[0].match(/[a-z|A-Z|0-9]*\_/g)[0].slice(0, -1)
				var number = data[0].match(/\_[0-9]*/g)[0].substr(1)
				var cmd = camelToSnake(name)
				var id = parseInt(number)
				if (!isNaN(id)) commands[cmd] = id
			}
		}
	}
	// alertAsJSON(commands)
	return commands
})()
