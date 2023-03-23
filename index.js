window.Fetch = {};
Fetch.Url = {};

Fetch.set = function (params) {
	Fetch.Url = Object.assign(Fetch.Url, params);
}

Fetch.ajax = function (option) {
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			option.success(JSON.parse(this.responseText));
		} else {
			option.error(JSON.parse(this.responseText));
		}
	}
	let arr = [];
	for (let i in option.data) {
		arr.push(i + '=' + option.data[i]);
	}
	let querystring = arr.join('&');
	
	if (option.type === 'GET') {
		xhr.open('GET', option.url + '?' + querystring);
		xhr.send();
	}
	if (option.type === "POST") {
		xhr.open('POST', option.url);
		xhr.setRequestHeader('Comtent-Type', 'application/x-www-form-urlencoded');
		xhr.send(querystring);
	}
}

Fetch.get = async function (u, data) {
	return await new Promise((resolve, reject) => {
		Fetch.ajax({
			url: Fetch.Url(u),
			data,
			type: 'GET',
			success: resolve,
			error: reject,
		})
	}) 
}

Fetch.post = async function (u, data) {
	return await new Promise((resolve, reject) => {
		Fetch.ajax({
			url: Fetch.Url(u),
			data,
			type: 'POST',
			success: resolve,
			error: reject,
		})
	}) 
}

