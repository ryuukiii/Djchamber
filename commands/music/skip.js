module.exports = {
    name: 'skip',
    description: 'skip the track',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

         if (!queue || !queue.playing) return inter.reply({ content:`Nenhuma música tocando ${inter.member}... try again ? ❌`, ephemeral: true });

        const success = queue.skip();

        return inter.reply({ content: success ? `música atual ${queue.current.title} pulada ✅` : `Something went wrong ${inter.member}... try again ? ❌`});
    },
};