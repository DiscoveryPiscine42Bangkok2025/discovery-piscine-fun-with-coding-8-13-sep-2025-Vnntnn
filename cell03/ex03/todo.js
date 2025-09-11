(function() {
	function setCookie(name, value, days) {
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
	}

	function getCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) === ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
		}
		return null;
	}

	function saveTodos() {
		var list = document.getElementById('ft_list');
		var items = list ? list.querySelectorAll('div.todo') : [];
		var values = [];
		for (var i = 0; i < items.length; i++) {
			values.push(items[i].textContent);
		}
		setCookie('todos', JSON.stringify(values), 7);
	}

	function createTodoElement(text) {
		var div = document.createElement('div');
		div.className = 'todo';
		div.textContent = text;
		div.addEventListener('click', function() {
			if (confirm('Do you want to remove this TO DO?')) {
				div.parentNode.removeChild(div);
				saveTodos();
			}
		});
		return div;
	}

	function addTodo(text) {
		if (!text) return;
		var list = document.getElementById('ft_list');
		if (!list) return;
		var todo = createTodoElement(text);
		if (list.firstChild) {
			list.insertBefore(todo, list.firstChild);
		} else {
			list.appendChild(todo);
		}
		saveTodos();
	}

	function loadTodos() {
		var data = getCookie('todos');
		if (!data) return;
		try {
			var arr = JSON.parse(data);
			if (Array.isArray(arr)) {
				for (var i = arr.length - 1; i >= 0; i--) {
					addTodo(arr[i]);
				}
			}
		} catch (e) {
		}
	}

	function onNewClick() {
		var text = prompt('Enter a new TO DO:');
        text = text.trim();
        if (text.length > 0) {
            addTodo(text);
        }
	}

	window.addEventListener('DOMContentLoaded', function() {
		var btn = document.getElementById('new');
		if (btn) btn.addEventListener('click', onNewClick);
		loadTodos();
	});
})();
