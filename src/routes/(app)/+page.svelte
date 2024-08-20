<script lang="ts">
	import type { PageData } from './$types';
    export let data: PageData;
</script>

<h1>Congratulations on conquering auth!</h1>

<div class="p">{data.username ?? "Error"}</div>
<img src={data.picture} alt="User">
