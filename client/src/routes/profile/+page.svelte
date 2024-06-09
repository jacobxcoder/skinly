<script lang="ts">
  import { goto } from '$app/navigation';
  import { AxiosError } from 'axios';
  import { Button, Loader, InputText, Textarea, notify } from '$lib/components';
  import { getUser, type User } from '$lib/api/auth.api';
  import { createProfile, updateProfile, getProfile } from '$lib/api/profile';
  import logger from '$lib/utils/logger';
  import type { Profile } from '$lib/api/profile/profile.validator';

  let user: User | null = null;
  let profile: Profile | null | undefined = undefined;

  let createProfileLoading = false;
  let loading = false;

  let form = {
    username: '',
    bio: ''
  };

  async function fetchUserAndProfile() {
    loading = true;

    try {
      const response = await getUser();
      user = response.user;
    } catch (e) {
      goto('/auth/login');
    }

    if (!user?.id) {
      goto('/auth/login');
    }

    try {
      const response = await getProfile(user?.id || 'abc');
      profile = response;
      form.username = profile?.username || '';
      form.bio = profile?.bio || '';
    } catch (e) {
      console.error(e);
      console.error(e.message);
      // goto('/auth/login');
    }

    loading = false;
  }

  async function handleUpdateOrCreateProfile() {
    console.log('here!');
    if (!user) {
      notify('error', 'User not found.', 'Log in and try again.');
      return;
    }

    if (!user.email) {
      notify('error', 'User email not found.', 'Log in and try again.');
      return;
    }

    if (!form.username) {
      notify('error', 'Username is required.', 'Please enter a username.');
      return;
    }

    createProfileLoading = true;

    try {
      const response = await (profile ? updateProfile : createProfile)({
        user_id: user.id,
        username: form.username,
        bio: form.bio,
        email: user.email
      });

      notify('success', `Profile ${profile ? 'updated' : 'created'} successfully.`);
    } catch (e) {
      if (e instanceof AxiosError) {
        notify('error', e?.response?.data?.error);
      } else {
        logger.error('Failed to create profile.');
        notify(
          'error',
          'Failed to create profile.',
          'Try again later or contact support.'
        );
      }
    } finally {
      createProfileLoading = false;
    }
  }

  fetchUserAndProfile();
</script>

{#if loading}
  <Loader full class="bg-base-200 bg-opacity-50" />
{/if}

<form
  class="mx-auto flex max-w-xl flex-col gap-8 px-6 py-12"
  on:submit|preventDefault={handleUpdateOrCreateProfile}>
  <div>
    <h1 class="mb-2 text-3xl font-semibold md:text-4xl">
      {profile ? 'Your profile' : 'Create your profile'}
    </h1>

    {#if profile}
      <p class="text-base-content-secondary">
        Here you can update your profile information.
      </p>
    {:else}
      <p class="text-base-content-secondary">
        Create your profile in order to use this app.
      </p>
    {/if}

    <div class="divider -mb-2"></div>
  </div>

  <InputText bind:value={form.username} label="Username" placeholder="your_nickname" />

  <Textarea
    label="Bio (optional)"
    placeholder="Short description of yourself..."
    rows={3}
    textAreaClass="resize-none"
    bind:value={form.bio} />

  <Button type="submit" class="btn-primary self-end" loading={createProfileLoading}>
    {!profile ? 'Create profile' : 'Update profile'}
  </Button>
</form>
