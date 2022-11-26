const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'search',
    description: 'procure uma faixa',
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'o som que você quer pesquisar',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ client, inter }) {
        const song = inter.options.getString('song');

        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return inter.reply({ content: `Sem resultados ${inter.member}... try again ? ❌`, ephemeral: true });

        const queue = await player.createQueue(inter.guild, {
            metadata: inter.channel,
            leaveOnEnd: client.config.opt.leaveOnEnd,
        });
        const maxTracks = res.tracks.slice(0, 10);

        const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setAuthor({ name: `Results for ${song}`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
        .setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\nSelect choice between **1** and **${maxTracks.length}** or **cancel** ⬇️`)
        .setTimestamp()
        .setFooter({ text: 'Music comes first ', iconURL: inter.member.avatarURL({ dynamic: true })})

        inter.reply({ embeds: [embed] });

        const collector = inter.channel.createMessageCollector({
            time: 15000,
            max: 1,
            errors: ['time'],
            filter: m => m.author.id === inter.member.id
        });

        collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancel') return inter.followUp({ content: `Search cancelled ✅`, ephemeral: true }), collector.stop();

            const value = parseInt(query);
            if (!value || value <= 0 || value > maxTracks.length) return inter.followUp({ content: `Invalid response, try a value between **1** and **${maxTracks.length}** or **cancel**... try again ? ❌`, ephemeral: true });

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(inter.member.voice.channel);
            } catch {
                await player.deleteQueue(inter.guildId);
                return inter.followUp({ content: `Eu não consigo entrar no canal ${inter.member}... try again ? ❌`, ephemeral: true });
            }

            await inter.followUp(`Carregando sua procura... 🎧`);

            queue.addTrack(res.tracks[query.content - 1]);

            if (!queue.playing) await queue.play();
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') return inter.followUp({ content:`Tempo de pesquisa acabou ${inter.member}... try again ? ❌`, ephemeral: true })
        });
    },
};