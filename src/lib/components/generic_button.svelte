<script lang="ts">
	export let text: string;
    export let type: "button" | "reset" | "submit" | null | undefined;
    export let disabled: boolean = false;
</script>

<button type={type} on:click disabled={disabled}>
    {text}
</button>

<style>
    button {
        height: 3rem;
        border-radius: 0.5rem;
        border: 3px solid #333333;
        background-color: #232323;
        color: white;
        font-weight: bold;
    }
</style>