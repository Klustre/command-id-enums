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
	var commands = {}
	var lines = file.split('\n')
	for (var i = 0; i < lines.length; i++) {
		var line = lines[i]
		// line = "$$$/AE/MenuID/0002/Export_2494=E&xportar"
		if (line.indexOf('MenuID') != -1) {
			var a = line.split('/') // REGEX: var data = line.match(/[a-z|A-Z|0-9]*\_[0-9]*/g)
			var b = a[a.length - 1].split('=')
			var c = b[0].split('_')
			var name = c[0] // REGEX: var name = data[0].match(/[a-z|A-Z|0-9]*\_/g)[0].slice(0, -1)
			var number = c[1] // REGEX: var number = data[0].match(/\_[0-9]*/g)[0].substr(1)
			if (number !== undefined && name !== 'MacAppMenu') {
				var snakeCase = camelToSnake(name)
				var exists = commands[snakeCase] != undefined
				if (!exists) {
					commands[snakeCase] = parseInt(number)
				}
			}
		}
	}
	// alertAsJSON(commands)
	return commands
})()
