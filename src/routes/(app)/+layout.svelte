<script>
    import logo from "$lib/assets/flash_logo.svg"
    import { page } from "$app/stores";
</script>

<div class="layout_grid">
    <div class="top_bar">
        <div class="top_bar_grid">
            <p>Menu</p>

            <div class="logo_container">
                <a href="/"><img class="flash_logo" src={logo} alt="flash"/></a>
            </div>
            
            <div class="pfp_container">
                {#if $page.data.session}
                    <a href="/profile" class="profile_picture"><img src={$page.data.session.user?.image} alt="Profile"></a>
                {/if}
            </div>
        </div>
    </div>
    
    <div class="main">
        <slot></slot>
    </div>

    <div class="nav_bar"></div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');

    :global(body) {
        margin: 0;
        padding: 0;
        background-color: #121212;
    }

    :global(a, p, h2){
        color: white;
        font-family: Raleway;
    }

    .layout_grid {
        display: grid;
        height: 100vh;
        grid-template-rows: 1fr 8fr 1fr;
    }

    .top_bar, .nav_bar {
        width: 100%;
        height: 100%;
        background-color: #232323;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 3;
    }

    .logo_container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .pfp_container {
        display: flex;
        align-items: center;
        justify-content: right;
        margin-right: 1rem;
    }

    .flash_logo {
        height: 5vh;
        transform: translateY(5px);
    }

    .main {
        height: 80vh;
		overflow-y: scroll;
    }

    .profile_picture img {
        width: 5vh;
        height: 5vh;
        align-self: flex-end;
        border: solid 4px #343434;
        border-radius: 1rem;
    }

    .top_bar_grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        width: 100%;
        height: 10vh;
    }
</style>