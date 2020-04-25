const fs = require("fs");
const settings = require("./settings.json");
const users = require("./users.json");
const Discord = require("discord.js");
const client = new Discord.Client();
var moment = require("moment");
var afk = [];

client.login(process.env.token);

client.on("ready", ready =>{
    console.log("Ready");
    //status
    client.user.setActivity('>help for commands', { type: 'PLAYING'}).catch(console.error);
    //avatar
    // client.user.setAvatar('./avatar.png')
    //     .then(user => console.log(`New avatar set!`))
    //     .catch(console.error);
    //username
    // client.user.setUsername('Sōji Mitsuka')
    //     .then(user => console.log(`My new username is ${user.username}`))
    //     .catch(console.error);
});

client.on("message", msg =>{
    //serverinfo
    //help
    //announce channel message
    //roleinfo

    if(msg.content.toLowerCase().split(' ')[0] === settings.prefix + 'announce' && msg.mebmer.hasPermission("ADMINISTRATOR")){
        //announce #channel message
        let args = msg.content.split(' ');
        let channel = msg.mentions.channels.array()[0];
        if(!channel) return;
        let mess = '';
        for(let i = 0; i < args.length; i++){
            mess += args[i];
            if(i !== args.length - 1){
                mess += ' ';
            }
        }
        channel.send(mess);
    }

    if(msg.content.toLowerCase().split(' ')[0] === (settings.prefix + "roleinfo")){
        //roleinfo @role
        let role = msg.mentions.roles.array()[0];
        if(!role) return;
        let embed = new Discord.RichEmbed();
        embed.setTitle(role.name);
        embed.addField("Color", role.hexColor,true);
        embed.addField("ID", role.id,true)
        msg.channel.send(embed);
    }

    if(msg.content.toLowerCase().split(' ')[0] === (settings.prefix + "serverinfo")){
        //serverinfo
        let embed = new Discord.RichEmbed();
        embed.setTitle(msg.guild.name);
        embed.addField("Users", msg.guild.members.array().length, true);
        embed.addField("Created at ", moment(msg.guild.createdAt).format('MMMM Do YYYY, h:mm:ss a'), true);
        msg.channel.send(embed);
    }

    if(msg.content.toLowerCase().split(' ')[0] === settings.prefix + 'hug'){
        let member = msg.mentions.members.array()[0];
        if(!member) return;
        fs.readdir("./hugImages", (err, files) =>{
            if(files.length === 0) return;
            let rand = Math.floor(Math.random() * files.length);
            msg.channel.send(`${msg.member.displayName} hugs ${member.displayName}`, {files : [{attachment : `./hugImages/${files[rand]}`}]});
        })
    }

    if(msg.content.toLowerCase().split(' ')[0] === settings.prefix + 'kiss'){
        let member = msg.mentions.members.array()[0];
        if(!member) return;
        fs.readdir("./kissImages", (err, files) =>{
            if(files.length === 0) return;
            let rand = Math.floor(Math.random() * files.length);
            msg.channel.send(`${msg.member.displayName} kisses ${member.displayName}`, {files : [{attachment : `./kissImages/${files[rand]}`}]});
        })
    }

    if(msg.content.toLowerCase().split(' ')[0] === settings.prefix + 'pat'){
        let member = msg.mentions.members.array()[0];
        if(!member) return;
        fs.readdir("./patImages", (err, files) =>{
            if(files.length === 0) return;
            let rand = Math.floor(Math.random() * files.length);
            msg.channel.send(`${msg.member.displayName} pats ${member.displayName}`, {files : [{attachment : `./patImages/${files[rand]}`}]});
        })
    }

    if(msg.content.toLowerCase().split(' ')[0] === settings.prefix + 'lewd'){
        let member = msg.mentions.members.array()[0];
        if(!member) return;
        fs.readdir("./lewdImages", (err, files) =>{
            if(files.length === 0) return;
            let rand = Math.floor(Math.random() * files.length);
            msg.channel.send(`${msg.member.displayName} lewds ${member.displayName}`, {files : [{attachment : `./lewdImages/${files[rand]}`}]});
        })
    }

    if(msg.content.toLowerCase().split(' ')[0] === settings.prefix + 'lick'){
        let member = msg.mentions.members.array()[0];
        if(!member) return;
        fs.readdir("./lickImages", (err, files) =>{
            if(files.length === 0) return;
            let rand = Math.floor(Math.random() * files.length);
            msg.channel.send(`${msg.member.displayName} licks ${member.displayName}`, {files : [{attachment : `./lickImages/${files[rand]}`}]});
        })
    }

    if(msg.content.toLowerCase().split(' ')[0] === settings.prefix + 'blush'){
        fs.readdir("./blushImages", (err, files) =>{
            if(files.length === 0) return;
            let rand = Math.floor(Math.random() * files.length);
            msg.channel.send(`${msg.member.displayName} blushes`, {files : [{attachment : `./blushImages/${files[rand]}`}]});
        })
    }

    if(msg.content.toLowerCase().split(' ')[0] === settings.prefix + 'cry'){
        fs.readdir("./cryImages", (err, files) =>{
            if(files.length === 0) return;
            let rand = Math.floor(Math.random() * files.length);
            msg.channel.send(`${msg.member.displayName} cries`, {files : [{attachment : `./cryImages/${files[rand]}`}]});
        })
    }

    if(msg.content.toLowerCase().split(' ')[0] === settings.prefix + 'dance'){
        fs.readdir("./danceImages", (err, files) =>{
            if(files.length === 0) return;
            let rand = Math.floor(Math.random() * files.length);
            msg.channel.send(`${msg.member.displayName} dances`, {files : [{attachment : `./danceImages/${files[rand]}`}]});
        })
    }

    if(msg.content.toLowerCase().split(' ')[0] === settings.prefix + 'wag'){
        fs.readdir("./wagImages", (err, files) =>{
            if(files.length === 0) return;
            let rand = Math.floor(Math.random() * files.length);
            msg.channel.send(`${msg.member.displayName} wags`, {files : [{attachment : `./wagImages/${files[rand]}`}]});
        })
    }

    if(msg.content.toLowerCase().split(' ')[0] === settings.prefix + 'pout'){
        fs.readdir("./poutImages", (err, files) =>{
            if(files.length === 0) return;
            let rand = Math.floor(Math.random() * files.length);
            msg.channel.send(`${msg.member.displayName} pouts`, {files : [{attachment : `./poutImages/${files[rand]}`}]});
        })
    }

    if(msg.content.toLowerCase().split(' ')[0] === settings.prefix + 'help'){
        //serverinfo
        //help
        //announce channel message
        //roleinfo
        //hug @user
        //kiss @user
        //pat @user
        //lewd @user
        //lick @user
        //blush
        //cry
        //dance
        //wag
        //pout
        let embed = new Discord.RichEmbed();
        embed.setTitle("Commands");
        embed.addField(">serverinfo", "Give info about server")
        embed.addField(">announce #channel message", "Send a message to given channel")
        embed.addField(">roleinfo @role", "Give info about given role")
        embed.addField(">hug @user", "Hug user")
        embed.addField(">kiss @user", "Kiss a user")
        embed.addField(">pat @user", "Pats a user")
        embed.addField(">lewd @user", "Lewds a user")
        embed.addField(">blush", "blushes")
        embed.addField(">cry", "cries")
        embed.addField(">dance", "dances")
        embed.addField(">wag", "wags")
        embed.addField(">pout", "pouts")
        msg.channel.send(embed);

    }
});

function getUser(id){
    for(let i = 0; i < users.users.length; i++){
        if(id === users.users[i].id){
            return i;
        }
    }
    return -1;
}