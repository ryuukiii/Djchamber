module.exports = {
    app: {
        token: 'MTA0NjA5NzQ4NTEyNDM1MDAwMg.G3-aLb.AUBc-0FU5HkOTCbSk0p-SCQolZLsWbl1Y-zYoU',
        playing: 'Okay, last looks. You all look wonderful. Me, I always look good, we are ready.',
        global: true,
        guild: '!'
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: 'DJ',
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'seek', 'skip', 'stop', 'volume']
        },
        maxVol: 100,
        leaveOnEnd: true,
        loopMessage: false,
        spotifyBridge: true,
        defaultvolume: 75,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
