// Calls the visitor-counter API (API Gateway -> Lambda -> DynamoDB)
// and writes the new count into #visitor-count on the landing page.
const COUNTER_URL = 'https://2ihpvly49k.execute-api.us-east-2.amazonaws.com/TriggerLambda';

const counterEl = document.getElementById('visitor-count');

if (counterEl) {
  fetch(COUNTER_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Non-proxy integration: API Gateway returns the Lambda's object,
      // so the count is inside a JSON string in data.body.
      const body = JSON.parse(data.body);
      const count = Number(body.visitor_count);
      counterEl.textContent = Number.isFinite(count)
        ? count.toLocaleString('en-US')
        : String(body.visitor_count);
    })
    .catch(error => {
      console.error('Error fetching visitor data:', error);
      counterEl.textContent = '—';
    });
}
