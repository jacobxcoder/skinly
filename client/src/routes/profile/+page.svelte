<script lang="ts">
  import { goto } from '$app/navigation';
  import { Button, Loader, InputText } from '$lib/components';
  import { getUser, type User } from '$lib/api/auth.api';
  import { createProfile, getProfile } from '$lib/api/profile';
  import logger from '$lib/utils/logger';
  import type { Profile } from '$lib/api/profile/profile.validator';

  let user: User | null = null;
  let profile: Profile | null | undefined = undefined;

  let createProfileLoading = false;
  let loading = false;
  let error = '';

  let form = {
    username: ''
  };

  async function fetchUserAndProfile() {
    loading = true;

    try {
      const response = await getUser();
      user = response.user;
      console.log('user: ', user);
    } catch (e) {
      // goto('/auth/login');
    }

    if (!user?.id) {
      // goto('/auth/login');
    }

    try {
      const response = await getProfile(user?.id || 'abc');
      console.log('response: ', response);
      profile = response;
    } catch (e) {
      console.log(e);
      logger.error('Failed to fetch user profile...', e);
      // goto('/auth/login');
    }

    loading = false;
  }

  async function handleCreateProfile() {
    if (!user) {
      error = 'User not found...';
      return;
    }

    createProfileLoading = true;

    try {
      if (!user.email) {
        error = 'User email not found...';
        return;
      }

      await createProfile({
        email: user.email,
        username: 'jakubszuminski',
        bio: 'This is my bio!',
        user_id: user?.id || ''
      });
    } catch (e) {
      logger.error('Failed to create profile...', e);
      error = 'Failed to create profile...';
    } finally {
      createProfileLoading = false;
    }
  }

  fetchUserAndProfile();
</script>

{#if loading}
  <Loader />
{/if}

{#if user}
  <h1>Welcome, {user.email}</h1>
  <p>Your account was created: {user.created_at}</p>
{/if}

{#if !profile}
  <p>You have not yet created your profile.</p>
  <p>Before you use this app, you need to create it.</p>

  <Button
    on:click={handleCreateProfile}
    class="btn-primary"
    loading={createProfileLoading}>Create Profile</Button>
{:else}
  <h2>Your Profile</h2>
  <p>First Name: {profile.username}</p>
  <p>Bio: {profile.bio}</p>
{/if}

<InputText bind:value={form.username} label="Username" />

{#if error}
  <p class="text-red-500">{error}</p>
{/if}
