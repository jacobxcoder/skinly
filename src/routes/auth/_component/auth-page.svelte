<script lang="ts">
  import { Button, InputText, Checkbox } from '$lib/components';
  import { Icon, ExclamationCircle } from 'svelte-hero-icons';
  import { goto } from '$app/navigation';
  import { getUser, login, register } from '$lib/api/auth/auth.api';
  import { auth } from '$lib/stores/auth';
  import { onMount } from 'svelte';

  export let mode: 'login' | 'register' | 'reset-password' = 'login';

  enum AuthMode {
    LOGIN = 'login',
    REGISTER = 'register',
    RESET_PASSWORD = 'reset-password'
  }

  let form = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  let loading = false;
  let error: string = '';
  let fieldErrors: { email: string[]; password: string[]; confirmPassword: string[] } = {
    email: [],
    password: [],
    confirmPassword: []
  };

  async function handleLogin() {
    const user = await login(form);

    if (user) {
      $auth = {
        user_id: user.id,
        email: user.email || ''
      };
    } else {
      $auth = null;
    }

    goto('/profile');
  }

  async function handleRegister() {
    if (form.password !== form.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    await register(form);
    goto('/auth/register-email-sent');
  }

  async function handleSubmit() {
    loading = true;

    try {
      if (mode === AuthMode.LOGIN) {
        await handleLogin();
      } else if (mode === AuthMode.REGISTER) {
        await handleRegister();
      }

      error = '';
    } catch (e) {
      e instanceof Error && (error = e.message);
    }

    loading = false;
  }

  $: if (
    mode !== AuthMode.LOGIN &&
    mode !== AuthMode.REGISTER &&
    mode !== AuthMode.RESET_PASSWORD
  ) {
    goto('/auth/login');
  }

  onMount(async () => {
    if ($auth) {
      const user = await getUser();
      if (user) {
        goto('/profile');
      }
    }
  });
</script>

<div class="flex min-h-full flex-col justify-center md:py-10">
  <!-- Header with title and your logo -->
  <header class="sm:mx-auto sm:w-full sm:max-w-md">
    <!--
    <enhanced:img
      class="mx-auto mb-8 h-12 w-auto"
      src="$lib/assets/logo.svg"
      alt="logo of the skinly application" />
    -->

    <h2 class="mt-6 text-center text-3xl font-semibold leading-9">
      {mode === AuthMode.LOGIN ? 'Sign in to your account' : 'Create your account'}
    </h2>
  </header>

  <!-- Main content and the form-->
  <main class="mt-3 sm:mx-auto sm:w-full sm:max-w-[480px] md:mt-10">
    <div
      class="rounded-lg border-base-200 bg-white bg-opacity-[2%] px-6 py-10 sm:px-12 md:border md:shadow">
      {#if error}
        <div class="mb-6 flex gap-2 rounded text-error">
          <Icon src={ExclamationCircle} class="h-5 w-5" />
          <p class="text-sm font-bold">
            {error}
          </p>
        </div>
      {/if}

      <form class="flex flex-col gap-y-6" on:submit|preventDefault={handleSubmit}>
        <InputText
          id="email"
          name="email"
          type="email"
          placeholder="Your email address"
          autocomplete="email"
          required
          label="Email"
          bind:value={form.email}
          error={fieldErrors?.email?.[0]} />

        <InputText
          id="password"
          name="password"
          type="password"
          autocomplete="current-password"
          placeholder="Choose your password"
          required
          label="Password"
          bind:value={form.password}
          error={fieldErrors?.password?.[0]} />

        {#if mode === AuthMode.REGISTER}
          <InputText
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            required
            label="Confirm password"
            bind:value={form.confirmPassword}
            error={fieldErrors?.confirmPassword?.[0]} />
        {:else}
          <div class="flex items-center justify-between">
            <Checkbox
              id="remember-me"
              name="remember-me"
              label="Remember me"
              inputClass="text-sm"
              labelClass="text-sm" />

            <div class="leading-6">
              <a href="#" class="link link-primary text-sm font-semibold no-underline">
                Forgot password?
              </a>
            </div>
          </div>
        {/if}

        <Button type="submit" class="btn-primary w-full" {loading}>
          {mode === AuthMode.LOGIN ? 'Sign in' : 'Sign up'}
        </Button>
      </form>

      <div>
        <div class="relative mt-10">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-base-300"></div>
          </div>
          <div class="relative flex justify-center text-sm font-medium leading-6">
            <span class="bg-base-100 px-6">Or continue with</span>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-2 gap-4">
          <form action="?/loginWithGoogle" method="POST">
            <Button type="submit" class="w-full border-base-300">
              <enhanced:img src="$lib/assets/icons/google.svg" class="h-5 w-5" />
              <span class="text-sm font-semibold leading-6">Google</span>
            </Button>
          </form>

          <form action="?/loginWithGithub" method="POST">
            <Button type="submit" class="w-full border-base-300">
              <enhanced:img src="$lib/assets/icons/github.svg" class="h-6 w-6" />
              <span class="text-sm font-semibold leading-6">Github</span>
            </Button>
          </form>
        </div>
      </div>
    </div>

    {#if mode === AuthMode.LOGIN}
      <p class="mt-10 text-center">
        Not a member?
        <a
          href="/auth/register"
          class="link link-primary font-semibold leading-6 no-underline">
          Register.
        </a>
      </p>
    {:else}
      <p class="mt-10 text-center">
        Already a member?
        <a
          href="/auth/login"
          class="link link-primary font-semibold leading-6 no-underline">
          Sign in.
        </a>
      </p>
    {/if}
  </main>
</div>
