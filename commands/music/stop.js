module.exports = {
    name: 'stop',
    description: 'pare o sinal',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content:`Nenhuma música tocando ${inter.member}... try again ? ❌`, ephemeral: true });

        queue.destroy();

        inter.reply({ content: `A música parou inteiro desse servidor, até a próxima. ✅`});
    },
};