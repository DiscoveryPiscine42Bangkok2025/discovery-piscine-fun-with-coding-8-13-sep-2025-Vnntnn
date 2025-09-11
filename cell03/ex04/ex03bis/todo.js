(function() {
    function setCookie(name, value, days) {
        var expires = '';
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
    }

    function getCookie(name) {
        var nameEQ = name + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return null;
    }

    function saveTodos() {
        var values = [];
        $('#ft_list .todo').each(function() { 
            values.push($(this).text()); 
        });
        setCookie('todos_jq', JSON.stringify(values), 7);
    }

    function createTodoElement(text) {
        var $div = $('<div/>', { 'class': 'todo', text: text });
        $div.on('click', function() {
            if (confirm('Do you want to remove this TO DO?')) {
                $div.remove();
                saveTodos();
            }
        });
        return $div;
    }

    function addTodo(text) {
        if (!text) return;
        var $todo = createTodoElement(text);
        var $list = $('#ft_list');
        if ($list.children().length) {
            $list.prepend($todo);
        } else {
            $list.append($todo);
        }
        saveTodos();
    }

    function loadTodos() {
        var data = getCookie('todos_jq');
        if (!data) return;
        try {
            var arr = JSON.parse(data);
            if (Array.isArray(arr)) {
                for (var i = arr.length - 1; i >= 0; i--) {
                    addTodo(arr[i]);
                }
            }
        } catch(e) {
        }
    }

    function onNewClick() {
        var text = prompt('Enter a new TO DO:');
        if (text === null) return;
        text = text.trim();
        if (text.length > 0) addTodo(text);
    }

    $(function() {
        $('#new').on('click', onNewClick);
        loadTodos();
    });
})();