module.exports = {
    name: 'back',
    description: "Volte uma música anterior",
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Nenhuma música tocando no momento ${inter.member}... try again ? ❌`, ephemeral: true });

        if (!queue.previousTracks[1]) return inter.reply({ content: `Não havia uma música tocada antes ${inter.member}... try again ? ❌`, ephemeral: true });

        await queue.back();

        inter.reply({ content:`Tocando **previous** track ✅`});
    },
};