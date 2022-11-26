module.exports = {
    name: 'resume',
    description: 'toque a faixa',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `Nenhuma música tocando ${inter.member}... try again ? ❌`, ephemeral: true });
        

        if(!queue.connection.paused) return inter.reply({content: `The track is already running, ${inter.member}... try again ? ❌`, ephemeral: true})

        const success = queue.setPaused(false);
        
        return inter.reply({ content:success ? `Current music ${queue.current.title} resumed ✅` : `Something went wrong ${inter.member}... try again ? ❌`});
    },
};
