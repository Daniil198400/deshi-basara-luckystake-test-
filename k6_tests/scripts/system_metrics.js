import si from 'systeminformation';

async function getSystemMetrics() {
  try {
    // currentLoad может иногда возвращать null, поэтому проверяем
    const cpuData = await si.currentLoad();
    const cpuLoad = [
      cpuData.avgload ?? 0,         // средняя нагрузка
      cpuData.currentload ?? 0,     // общая нагрузка %
      cpuData.currentload_user ?? 0 // нагрузка пользователя
    ];

    const memData = await si.mem();
    const memory = {
      used: memData.active,
      free: memData.available,
      total: memData.total
    };

    return { cpuLoad, memory };
  } catch (err) {
    console.error('❌ Failed to get system metrics:', err.message);
    return null;
  }
}

// Немного "разогреваем" CPU load перед первым выводом
async function init() {
  await si.currentLoad(); // первый вызов нужен для инициализации
  setInterval(async () => {
    const metrics = await getSystemMetrics();
    if (metrics) {
      console.log(JSON.stringify(metrics, null, 2));
    }
  }, 2000);
}

init();
