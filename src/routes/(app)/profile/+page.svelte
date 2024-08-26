<script lang="ts">
    import GenericInput from '$lib/components/generic_input.svelte';
    import GenericButton from '$lib/components/generic_button.svelte';

    import type { PageData } from './$types';
    export let data: PageData;

    let user = data.user
</script> 

<div class="profile_picture">
    <img src={user.googlePicture} alt="profile">
</div>

<p>Username</p>
<div class="username_container">
    <GenericInput name="username" value={user.username}/>
    <GenericButton text="UPDATE" type="button" />
</div>

<style>
    .profile_picture img{
        border: 4px solid #343434;
        border-radius: 50%;
        min-width: 100px;
        min-height: 100px;
    }

    .username_container {
        display: flex;
        gap: 8px;
    }
</style>