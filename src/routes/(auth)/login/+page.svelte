<script>
	import GoogleLoginButton from "$lib/components/google_login_button.svelte";
    import flash_logo from "$lib/assets/flash_logo.svg";
</script>

<div class="login_grid">
    <img src={flash_logo} alt="Flash logo" class="flash_logo">
    <div class="login_selector">
        <a href="/login/google"><GoogleLoginButton /></a>
    </div>
</div>

<div class="p"></div>

<style>
	:global(body) {     
		margin: 0;
		padding: 0;
        background-color: #121212;
	}
    .flash_logo {
        width: 20vh;
        margin: 1rem;
    }
    .login_grid {
        display: flex;
        width: 100vw;
        height: 100vh;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .login_selector {
        padding: 1rem;
        background-color: #343434;
        border-radius: 1rem;
    }
</style>