<script lang="ts">
	export let text: string;
    export let type: "button" | "reset" | "submit" | null | undefined;
    export let disabled: boolean = false;
</script>

<button type={type} on:click disabled={disabled}>
    {text}
</button>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap');

    button {
        font-family: "Source Code Pro", monospace;
        box-sizing: border-box;
        border: 0;
        height: 3rem;
        border-radius: 0.5rem;
        border: 3px solid #333333;
        background-color: #232323;
        color: white;
        font-weight: bold;
        font-size: 1rem;
        font-weight: 800;
    }
</style>