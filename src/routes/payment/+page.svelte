<script lang="ts">
  import { supabase } from '$lib/api';
  import { getUser } from '$lib/api/auth';
  // Function to handle the payment process
  async function handlePayment() {
    const user = await getUser();

    if (!user) {
      alert('Please login to proceed with the payment.');
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke(
        'create-checkout-session',
        {}
      );

      const _data = JSON.parse(data);

      if (error) {
        console.error('Error during payment process:', error);
        alert('Error during payment process. Please try again.');
        return;
      }

      if (_data.url) {
        window.location.href = _data.url;
      }
    } catch (error) {
      console.error('Error during payment process:', error);
      alert('Error during payment process. Please try again.');
    }
  }
</script>

<!-- The UI of the page -->
<main>
  <h1>Payment Page</h1>
  <button class="btn btn-primary" on:click={handlePayment}>Pay</button>
</main>
