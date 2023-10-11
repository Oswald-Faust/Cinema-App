<template>
	<body class="font-montserrat text-sm bg-white dark:bg-zinc-900 " >
    <div class="flex min-h-screen  2xl:max-w-screen-2xl 2xl:mx-auto 2xl:border-x-2 2xl:border-gray-200 dark:2xl:border-zinc-700 ">
        <!-- Left Sidebar -->
        <main-menu></main-menu>
    </div>
    </body>
</template>

<script>

    import MainMenu from "../components/MainMenu.vue"; // Assurez-vous d'ajuster le chemin d'importation
    export default {
    components: {
        'main-menu': MainMenu, // Enregistrez le composant menu
    },
    // ... le reste de votre script
    };


</script>