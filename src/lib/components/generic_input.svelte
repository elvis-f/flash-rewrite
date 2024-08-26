<script lang="ts">
	export let name: string;
    export let value: string = "Nothing...";
</script>

<input name={name} bind:value on:input>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap');

    input {
        box-sizing: border-box;
        border: 0;
        padding: 0;
        font-family: "Source Code Pro", monospace;
        height: 3rem;
        border-radius: 0.5rem;
        border: 3px solid #f63f55;
        background-color: #111111;
        color: #CDCDCD;
        font-weight: bold;
        padding-left: 1rem;
        font-size: 1rem;
        font-weight: 600;
    }
</style>
