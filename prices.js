const PRICES = {
  directions: [
    {
      id: 'turtsiya',
      name: 'Турция',
      note: 'Анталья, отель 4*, всё включено',
      positions: [
        { label: 'Размещение и питание', kind: 'perPersonPerNight', price: 5400 },
        { label: 'Медицинская страховка', kind: 'perPersonPerDay', price: 350 },
        { label: 'Трансфер аэроппорт — отель', kind: 'perGroupOnce', price: 2600 }
      ]
    },
    {
      id: 'oae',
      name: 'ОАЭ',
      note: 'Дубай, отель 4*, завтрак включён',
      positions: [
        { label: 'Размещение и завтрак', kind: 'perPersonPerNight', price: 9800 },
        { label: 'Медицинская страховка', kind: 'perPersonPerDay', price: 500 },
        { label: 'Трансфер аэроппорт — отель', kind: 'perGroupOnce', price: 4500 }
      ]
    },
    {
      id: 'egipet',
      name: 'Египет',
      note: 'Шарм-эль-Шейх, отель 4*, всё включено',
      positions: [
        { label: 'Размещение и питание', kind: 'perPersonPerNight', price: 4300 },
        { label: 'Медицинская страховка', kind: 'perPersonPerDay', price: 300 },
        { label: 'Экскурсия по пустыне', kind: 'perPersonOnce', price: 1800 }
      ]
    },
    {
      id: 'tailand',
      name: 'Таиланд',
      note: 'Пхукет, отель 4*, завтрак включён',
      positions: [
        { label: 'Размещение и завтрак', kind: 'perPersonPerNight', price: 7200 },
        { label: 'Медицинская страховка', kind: 'perPersonPerDay', price: 600 },
        { label: 'Трансфер аэроппорт — отель', kind: 'perGroupOnce', price: 3800 }
      ]
    },
    {
      id: 'sochi',
      name: 'Сочи',
      note: 'Россия, отель 3*, завтрак включён',
      positions: [
        { label: 'Размещение и завтрак', kind: 'perPersonPerNight', price: 3900 },
        { label: 'Медицинская страховка', kind: 'perPersonPerDay', price: 250 },
        { label: 'Трансфер аэропорт — отель', kind: 'perGroupOnce', price: 1500 }
      ]
    },
    {
      id: 'belarus',
      name: 'Беларусь',
      note: 'Россия, отель 3*, завтрак включён',
      positions: [
        { label: 'Размещение и завтрак', kind: 'perPersonPerNight', price: 3100 },
        { label: 'Медицинская страховка', kind: 'perPersonPerDay', price: 200 }
      ]
    }
  ]
};
