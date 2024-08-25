<script lang="ts">
    import type { PageData } from './$types';

    import { onMount } from 'svelte';
    import flash_logo from "$lib/assets/flash_logo.svg";
	import GenericButton from '$lib/components/generic_button.svelte';

	export let data: PageData;
    
    let username = data.rand_username;
    let isAvailable = false;
    let checking = false;

    function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
        let timeoutId: ReturnType<typeof setTimeout>;

        return function(this: unknown, ...args: Parameters<T>) {
            clearTimeout(timeoutId);
            checking = true;

            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    const checkUsername = async () => {
        if (!username) {
            isAvailable = false;
            return;
        }

        try {
            const response = await fetch(`/api/check-username?username=${encodeURIComponent(username)}`);
            const result = await response.json();
            isAvailable = result.available;
        } catch (error) {
            console.error('Error checking username:', error);
            isAvailable = false;
        } finally {
            checking = false;
        }
    };

    const debouncedCheckUsername = debounce(checkUsername, 200)

    const getNewUsername = async () => {
        const response = await fetch(`/api/get-rand-username`);
        const result = await response.json();

        username = result.username;
    }

    onMount(async () => {
        checkUsername()
	});
</script>

<div class="main_container">
    <h1>
        La oss sette opp profilen din!
    </h1>

    <form method="POST">
        <div class="flex_container">
            <label for=username>
                Velg et godt brukernavn!
            </label>
            <p>(Maks 30 tegn)</p>
            <input name="username" type="username" bind:value={username} on:input={debouncedCheckUsername}>
            <!-- <button type="button" on:click={getNewUsername}>New name</button> -->
            <!-- <GenericButton type="button" on:click={getNewUsername} text="New name" /> -->
            {#if username == ""}
                <p class="checking">Ingenting å sjekke</p>
            {:else if checking}
                <p class="checking">Sjekker...</p>
            {:else}
                {#if isAvailable}
                    <p class="available">Tilgjengelig</p>
                {:else}
                    <p class="unavailable">Utilgjengelig</p>
                {/if}
            {/if}
            <GenericButton type="submit" text="Submit" disabled={!isAvailable || checking}/>
            <!-- <button type="submit" disabled={!isAvailable || checking}>Submit</button> -->
        </div>
    </form>
    <img src={flash_logo} alt="Flash logo" class="flash_logo">
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');

    .flex_container {
        display: flex;
        flex-direction: column;
        width: 50vw;
    }

    :global(body) {     
		margin: 0;
		padding: 0;
        background-color: #121212;
        color: white;
        font-family: Raleway;
	}

    .main_container {
        display: flex;
        height: 100vh;
        width: 100vw;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .available{
        color: green;
    }

    .unavailable {
        color: red;
    }

    .flash_logo {
        width: 20vh;
        margin: 1rem;
    }
    /* .login_grid {
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
    } */
</style>