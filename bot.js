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
    client.user.setActivity('with kittens', { type: 'PLAYING'}).catch(console.error);
});

client.on("message", msg =>{
    //kick @user
    //ban @user
    //role give/remove @user
    //changecolor role @user
    //changenick @user nickname
    //serverinfo
    //help
    //deleterole role
    //addrole name color
    //announce channel message
    //roleinfo
    //profile
    if(msg.content.toLowerCase().split(' ')[0] === settings.prefix + 'kick' && msg.mebmer.hasPermission("ADMINISTRATOR")){
        //kick @user
        let member = msg.mentions.members.array()[0];
        if(!member) return;
        member.kick();
        msg.reply("User was kicked");
    }

    if(msg.content.toLowerCase().split(' ')[0] === settings.prefix + 'ban' && msg.mebmer.hasPermission("ADMINISTRATOR")){
        //ban @user
        let member = msg.mentions.members.array()[0];
        if(!member) return;
        member.ban();
        msg.reply("User was banned");
    }

    if(msg.content.toLowerCase().split(' ')[0] === settings.prefix + 'role' && msg.mebmer.hasPermission("ADMINISTRATOR")){
        //role give/remove @user
        let args = msg.content.split(' ');
        if(!args[1]) return;
        if(args[1] === 'give'){
            let role = msg.mentions.roles.array()[0];
            let member = msg.mentions.members.array()[0];
            if(!member || !role) return;
            member.addRole(role);
            msg.reply("User was given this role");
        }
        else if(args[1] === 'remove'){
            let role = msg.mentions.roles.array()[0];
            let member = msg.mentions.members.array()[0];
            if(!member || !role) return;
            if(!member.roles.get(role.id)) return;
            member.removeRole(role);
            msg.reply("User was removed from this role");
        }
    }

    if(msg.content.toLowerCase().split(' ')[0] === settings.prefix + 'changecolor' && msg.mebmer.hasPermission("ADMINISTRATOR")){
        //changecolor role #hex
        let role = msg.mentions.roles.array()[0];
        let args = msg.content.split(' ');
        if(!args[2] || !role) return;
        role.setColor(args[2]);
        msg.reply("Color of this role was changed");
    }

    if(msg.content.toLowerCase().split(' ')[0] === settings.prefix + 'changenickname' && msg.mebmer.hasPermission("ADMINISTRATOR")){
        //changenickname @user nick
        let args = msg.content.split(' ');
        let member = msg.mentions.members.array()[0];
        if(!args[2] || !member) return;
        let nick = '';
        for(let i = 2; i < args.length; i++){
            nick += args[i];
            if(i !== args.length - 1) nick += ' ';
        }
        member.setNickname(nick);
        msg.reply("Nickname was changed");
    }

    if(msg.content.toLowerCase().split(' ')[0] === settings.prefix + 'addrole' && msg.mebmer.hasPermission("ADMINISTRATOR")){
        //addrole name hex
        let args = msg.content.split(' ');
        if(!args[1] || args[2]) return;
        msg.guild.createRole({name : args[1], color : args[2]});
        msg.reply("Role was created");
    }

    if(msg.content.toLowerCase().split(' ')[0] === settings.prefix + 'deleterole' && msg.mebmer.hasPermission("ADMINISTRATOR")){
        //deleterole role
        let role = msg.mentions.roles.array()[0];
        if(!role) return;
        role.delete();
        msg.reply("Role was deleted");
    }

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
            msg.channel.send(`${msg.member.displayName} hugs ${member}`, {files : [{attachment : `./hugImages/${files[rand]}`}]});
        })
    }

    if(msg.content.toLowerCase().split(' ')[0] === settings.prefix + 'kiss'){
        let member = msg.mentions.members.array()[0];
        if(!member) return;
        fs.readdir("./kissImages", (err, files) =>{
            if(files.length === 0) return;
            let rand = Math.floor(Math.random() * files.length);
            msg.channel.send(`${msg.member.displayName} kisses ${member}`, {files : [{attachment : `./kissImages/${files[rand]}`}]});
        })
    }

    if(msg.content.toLowerCase().split(' ')[0] === settings.prefix + 'pat'){
        let member = msg.mentions.members.array()[0];
        if(!member) return;
        fs.readdir("./patImages", (err, files) =>{
            if(files.length === 0) return;
            let rand = Math.floor(Math.random() * files.length);
            msg.channel.send(`${msg.member.displayName} pats ${member}`, {files : [{attachment : `./patImages/${files[rand]}`}]});
        })
    }

    if(msg.content.toLowerCase().split(' ')[0] === settings.prefix + 'lewd'){
        let member = msg.mentions.members.array()[0];
        if(!member) return;
        fs.readdir("./lewdImages", (err, files) =>{
            if(files.length === 0) return;
            let rand = Math.floor(Math.random() * files.length);
            msg.channel.send(`${msg.member.displayName} lewds ${member}`, {files : [{attachment : `./lewdImages/${files[rand]}`}]});
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
        //kick @user
        //ban @user
        //role give/remove @user
        //changecolor role @user
        //changenick @user nickname
        //serverinfo
        //help
        //deleterole role
        //addrole name color
        //announce channel message
        //roleinfo
        //hug @user
        //kiss @user
        //pat @user
        //lewd @user
        //blush
        //cry
        //dance
        //wag
        //pout
        let embed = new Discord.RichEmbed();
        embed.setTitle("Commands");
        embed.addField(">kick @user", "Kicks a user");
        embed.addField(">ban @user", "Bans a user")
        embed.addField(">role give/remove @user @role", "Gives/removes role of this user")
        embed.addField(">changecolor @role hex", "Changes the hex color of mentioned role")
        embed.addField(">changenick @user nickname", "Changes this user nickname")
        embed.addField(">serverinfo", "Give info about server")
        embed.addField(">deleterole @role", "Deletes mentioned role")
        embed.addField(">addrole name color", "Creates a role with given hex color")
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