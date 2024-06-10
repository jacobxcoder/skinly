import { getUser } from '$lib/api/auth';
import { notify } from '$lib/components';
import { goto } from '$app/navigation';

export default async function authorize() {
  try {
    const user = await getUser();

    if (!user) {
      throw new Error('User is not authenticated');
    }

    return user;
  } catch (e) {
    notify('error', 'You need to be logged in', 'Please log in to access this page');
    goto('/auth/login');
    return;
  }
}
