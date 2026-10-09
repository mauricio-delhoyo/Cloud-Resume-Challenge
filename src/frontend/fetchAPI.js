fetch('https://2ihpvly49k.execute-api.us-east-2.amazonaws.com/TriggerLambda')
  .then(response => response.json())
  .then(data => {
    const body = JSON.parse(data.body);
    document.getElementById('visitor-count').textContent = `Visitor count: ${body.visitor_count}`;
  })
  .catch(error => {
    console.error('Error fetching visitor data:', error);
  });