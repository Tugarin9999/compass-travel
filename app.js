(function () {
  'use strict';

  var LIMITS = {
    days: { min: 1, max: 365 },
    tourists: { min: 1, max: 60 }
  };

  var form = document.getElementById('calc-form');
  var directionSelect = document.getElementById('direction');
  var daysInput = document.getElementById('days');
  var touristsInput = document.getElementById('tourists');
  var hintBox = document.getElementById('result-hint');
  var totalBox = document.getElementById('result-total');
  var totalSum = document.getElementById('total-sum');
  var perPerson = document.getElementById('per-person');
  var breakdownBody = document.getElementById('breakdown-body');

  var moneyFormatter = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 });

  function formatMoney(value) {
    return moneyFormatter.format(Math.round(value)) + ' ₽';
  }

  function plural(count, forms) {
    var remainder100 = count % 100;
    var remainder10 = count % 10;
    if (remainder100 >= 11 && remainder100 <= 14) {
      return forms[2];
    }
    if (remainder10 === 1) {
      return forms[0];
    }
    if (remainder10 >= 2 && remainder10 <= 4) {
      return forms[1];
    }
    return forms[2];
  }

  function readNumber(input, limits) {
    var raw = input.value.trim();

    if (raw === '') {
      return { error: 'Укажите значение' };
    }
    if (!/^\d+$/.test(raw)) {
      return { error: 'Введите целое число' };
    }

    var value = Number(raw);
    if (value < limits.min) {
      return { error: 'Минимальное значение — ' + limits.min };
    }
    if (value > limits.max) {
      return { error: 'Максимальное значение — ' + limits.max };
    }

    return { value: value };
  }

  function findDirection(id) {
    for (var i = 0; i < PRICES.directions.length; i += 1) {
      if (PRICES.directions[i].id === id) {
        return PRICES.directions[i];
      }
    }
    return null;
  }

  function countFor(kind, days, tourists) {
    switch (kind) {
      case 'perPersonPerNight':
      case 'perPersonPerDay':
        return days * tourists;
      case 'perPersonOnce':
        return tourists;
      case 'perGroupOnce':
        return 1;
      default:
        return 0;
    }
  }

  function explainCalculation(position, days, tourists) {
    switch (position.kind) {
      case 'perPersonPerNight':
        return formatMoney(position.price) + ' × ' + days + ' ' + plural(days, ['ночь', 'ночи', 'ночей']) +
          ' × ' + tourists + ' ' + plural(tourists, ['человек', 'человека', 'человек']);
      case 'perPersonPerDay':
        return formatMoney(position.price) + ' × ' + days + ' ' + plural(days, ['день', 'дня', 'дней']);
      case 'perPersonOnce':
        return formatMoney(position.price) + ' × ' + tourists + ' ' + plural(tourists, ['человек', 'человека', 'человек']);
      default:
        return 'на всю группу';
    }
  }

  function calculate(direction, days, tourists) {
    var rows = [];
    var total = 0;

    direction.positions.forEach(function (position) {
      var amount = Math.round(position.price * countFor(position.kind, days, tourists));
      total += amount;
      rows.push({
        label: position.label,
        explanation: explainCalculation(position, days, tourists),
        amount: amount
      });
    });

    return { rows: rows, total: total };
  }

  function showHint(message) {
    hintBox.textContent = message;
    hintBox.hidden = false;
    totalBox.hidden = true;
    breakdownBody.textContent = '';
  }

  function showResult(direction, days, tourists) {
    var result = calculate(direction, days, tourists);

    hintBox.hidden = true;
    totalBox.hidden = false;
    totalSum.textContent = formatMoney(result.total);
    perPerson.textContent = 'На одного туриста — ' + formatMoney(result.total / tourists);

    breakdownBody.textContent = '';
    result.rows.forEach(function (row) {
      var tr = document.createElement('tr');

      var nameCell = document.createElement('td');
      nameCell.textContent = row.label;

      var explanationCell = document.createElement('td');
      explanationCell.textContent = row.explanation;
      explanationCell.className = 'breakdown__explanation';

      var amountCell = document.createElement('td');
      amountCell.textContent = formatMoney(row.amount);
      amountCell.className = 'breakdown__amount';

      tr.appendChild(nameCell);
      tr.appendChild(explanationCell);
      tr.appendChild(amountCell);
      breakdownBody.appendChild(tr);
    });
  }

  function update() {
    if (!directionSelect.value) {
      showHint('Выберите направление — и стоимость посчитается сразу.');
      return;
    }

    var direction = findDirection(directionSelect.value);
    if (!direction) {
      showHint('Направление не найдено в прайсе.');
      return;
    }

    var days = readNumber(daysInput, LIMITS.days);
    var tourists = readNumber(touristsInput, LIMITS.tourists);

    if (days.error) {
      showHint('Количество дней: ' + days.error.toLowerCase() + '.');
      return;
    }
    if (tourists.error) {
      showHint('Число туристов: ' + tourists.error.toLowerCase() + '.');
      return;
    }

    showResult(direction, days.value, tourists.value);
  }

  var placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = '— выберите направление —';
  directionSelect.appendChild(placeholder);

  PRICES.directions.forEach(function (direction) {
    var option = document.createElement('option');
    option.value = direction.id;
    option.textContent = direction.name + ' — ' + direction.note;
    directionSelect.appendChild(option);
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
  });

  form.addEventListener('input', update);
  form.addEventListener('change', update);

  update();
})();
