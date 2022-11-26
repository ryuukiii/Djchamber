module.exports = {
    name: 'shuffle',
    description: 'embaralhar a faixa',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Nenhuma música tocando ${inter.member}... try again ? ❌`, ephemeral: true });

        if (!queue.tracks[0]) return inter.reply({ content: `Nenhuma música na fila depois da atual ${inter.member}... try again ? ❌`, ephemeral: true });

        await queue.shuffle();

        return inter.reply({ content:`Queue shuffled **${queue.tracks.length}** song(s) ! ✅`});
    },
};