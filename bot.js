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
});

client.on("message", msg =>{
    //kick @user
    //ban @user
    //role give/remove @user
    //changecolor role @user
    //changenick @user nickname
    //whois
    //afk status
    //serverinfo
    //help
    //deleterole role
    //addrole name color
    //announce channel message
    //roleinfo
    //profile
    if(mentioned(msg.mentions.members.array()[0]) !== "-1"){
        let status = mentioned(msg.mentions.members.array()[0]);
        msg.reply(`This user is afk, reason : ${status}`);
    }
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
            msg.reply("User was given this role");
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
    if(msg.content.toLowerCase().split(' ')[0] === settings.prefix + 'afk'){
        //afk status/or withoutstatus
        let args = msg.content.split(' ');
        let status = '';
        for(let i = 1; i < args.length; i++){
            status += args[i];
            if(i !== args.length - 1) status += ' ';
        }
        afk.push({member : msg.member, status : status});
        msg.reply("You are now afk");
    }

    if(msg.content.toLowerCase().split(' ')[0] === (settings.prefix + "whois")){
        //;whois @user
        let rolesField;
        let permissionField = '';
        let user = msg.mentions.users.array()[0];
        let member = msg.mentions.members.array()[0];
        if(!member){
            member = msg.member;
        }
        if(!user){
            user = msg.author;
        }
        let minutes = member.joinedAt.getMinutes().toString();
        let minutesUser = user.createdAt.getMinutes().toString();
        if(member.joinedAt.getMinutes() < 10){
            minutes = '0' + minutes;
        }
        if(user.createdAt.getMinutes() < 10){
            minutesUser = '0' + minutesUser;
        }
        let userEmbed = new Discord.RichEmbed();
        userEmbed.setThumbnail(user.avatarURL);
        userEmbed.setAuthor(user.username, user.avatarURL);
        userEmbed.addField("Joined at", member.joinedAt.toDateString() + '\n' + member.joinedAt.getHours() + ":" + minutes,true);
        userEmbed.addField("Registered", user.createdAt.toDateString() + '\n' + member.joinedAt.getHours() + ":" + minutesUser,true);
        if(member.roles.array().length > 8){
            userEmbed.addField("Roles[" + member.roles.array().length + ']', "Too many to display");
        }
        else{
            for(let i = 0; i < member.roles.array().length; i++){
                if(member.roles.array()[i] !== "@everyone"){
                    if(!rolesField){
                        rolesField = member.roles.array()[i] + ' ';
                    }
                    else{
                        rolesField += member.roles.array()[i] + ' ';
                    }
                }
            }
            userEmbed.addField("Roles[" + member.roles.array().length + ']', rolesField);
        }
        let permissions = member.permissions.toArray();
        for(let i = 0; i < permissions.length; i++){
            if(permissions[i] === "KICK_MEMBERS"){
                if(permissionField != ""){
                    permissionField += ", "
                }
                permissionField += "Kick Members"
            }
            if(permissions[i] === "BAN_MEMBERS"){
                if(permissionField != ""){
                    permissionField += ", "
                }
                permissionField += "Ban Members"
            }
            if(permissions[i] === "ADMINISTRATOR"){
                if(permissionField != ""){
                    permissionField += ", "
                }
                permissionField += "Administator"
            }
            if(permissions[i] === "MANAGE_CHANNELS"){
                if(permissionField != ""){
                    permissionField += ", "
                }
                permissionField += "Manage Channels"
            }
            if(permissions[i] === "MANAGE_GUILD"){
                if(permissionField != ""){
                    permissionField += ", "
                }
                permissionField += "Manage Server"
            }
            if(permissions[i] === "MANAGE_MESSAGES"){
                if(permissionField != ""){
                    permissionField += ", "
                }
                permissionField += "Manage Messages"
            }
            if(permissions[i] === "MENTION_EVERYONE"){
                if(permissionField != ""){
                    permissionField += ", "
                }
                permissionField += "Mention Everyone"
            }
            if(permissions[i] === "MANAGE_ROLES"){
                if(permissionField != ""){
                    permissionField += ", "
                }
                permissionField += "Manage Roles"
            }
            if(permissions[i] === "MANAGE_NICKNAMES"){
                if(permissionField != ""){
                    permissionField += ", "
                }
                permissionField += "Manage Nicknames"
            }
            if(permissions[i] === "MANAGE_EMOJIS"){
                if(permissionField != ""){
                    permissionField += ", "
                }
                permissionField += "Manage Emojis"
            }
            if(permissions[i] === "MANAGE_WEBHOOKS"){
                if(permissionField != ""){
                    permissionField += ", "
                }
                permissionField += "Manage Webhooks"
            }
        }
        // if(getUser(member.id) !== -1){
        //     userEmbed.addField("Currency" , users.users[getUser(member.id)].currency, true);
        // }
        userEmbed.addField("Permissions", permissionField);
        msg.channel.send(userEmbed);
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
    // if(msg.content.toLowerCase().split(' ')[0] === settings.prefix + 'daily'){
    //     //daily
    //     let ind = getUser(msg.member.id);
    //     if(ind !== -1){
    //         if(users.users[ind].gainedPoints) return;
    //     }
    //     addPoints(msg.member, 100).then(() =>{
    //         for(let i = 0; i < users.users.length; i++){
    //             if(users.users[i].id === msg.member.id){
    //                 ind = i;
    //             }
    //         }
    //         users.users[ind].gainedPoints = true;
    //         fs.writeFile("users.json", JSON.stringify(users, ' ', 2), function(err){
    //             if(err) console.log(err);
    //         })
    //     });
    // }

    if(msg.content.toLowerCase().split(' ')[0] === settings.prefix + 'profile'){
        //profile @user
        let member = msg.mentions.members.array()[0];
        if(!member){
            member = msg.member;
        }
        let embed = new Discord.RichEmbed();
        embed.setTitle(member.displayName);
        embed.setThumbnail(member.user.avatarURL);
        let ind = getUser(member.id);
        if(ind === -1){
            embed.setDescription("This profile is blank");
            msg.channel.send(embed);
            return;
        }
        else{
            if(users.users[ind].profileFields){
                embed.addField(users.users[ind].profileFields.title, users.users[ind].profileFields.field)
            }
        }
        msg.channel.send(embed);
    }

    if(msg.content.toLowerCase().split(' ')[0] === settings.prefix + 'profileadd'){
        //profileadd {field_title} {content}
        let args = msg.content.split("{");
        let fieldTitle = args[1].split('}')[0];
        let content = args[2].split('}')[0];
        let ind = getUser(msg.member.id);
        if(ind === -1){
            users.users.push({
                id : msg.member.id,
                // currency : 0,
                // gainedPoints : false,
                profileFields : {title : fieldTitle, field : content}
            })
            fs.writeFile("users.json", JSON.stringify(users, ' ', 2), function(err){
                if(err) console.log(err);
            })
        }
        else{
            users.users[ind].profileFields.title = fieldTitle;
            users.users[ind].profileFields.field = content;
            fs.writeFile("users.json", JSON.stringify(users, ' ', 2), function(err){
                if(err) console.log(err);
            })
        }
    }
    // if(msg.content.toLowerCase().split(' ')[0] === settings.prefix + 'addcurrency' && msg.member.hasPermission("ADMINISTRATOR")){
    //     //addcurrency @user points
    //     let args = msg.content.split(' ');
    //     let member = msg.mentions.members.array()[0];
    //     if(!args[2] || !member) return;
    //     let points = args[2];
    //     addPoints(member, points);
    //     msg.reply("Points were added");
    // }

    // if(msg.content.toLowerCase().split(' ')[0] === settings.prefix + 'removecurrency' && msg.member.hasPermission("ADMINISTRATOR")){
    //     //addcurrency @user points
    //     let args = msg.content.split(' ');
    //     let member = msg.mentions.members.array()[0];
    //     if(!args[2] || !member) return;
    //     let points = args[2];
    //     addPoints(member, points);
    //     msg.reply("Points were added");
    // }

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

    if(msg.content.toLowerCase().split(' ')[0] === settings.prefix + 'help'){
        //kick @user
        //ban @user
        //role give/remove @user
        //changecolor role @user
        //changenick @user nickname
        //whois @user
        //afk status
        //serverinfo
        //help
        //deleterole role
        //addrole name color
        //announce channel message
        //roleinfo
        //daily
        //currency add/remove @user amount
        //profile
        //profileadd {field_title} {content}
        //hug @user
        //kiss @user
        //pat @user
        //lewd @user
        let embed = new Discord.RichEmbed();
        embed.setTitle("Commands");
        embed.addField(">kick @user", "Kicks a user");
        embed.addField(">ban @user", "Bans a user")
        embed.addField(">role give/remove @user @role", "Gives/removes role of this user")
        embed.addField(">changecolor @role hex", "Changes the hex color of mentioned role")
        embed.addField(">changenick @user nickname", "Changes this user nickname")
        embed.addField(">whois @user", "Give info about this user");
        embed.addField(">afk status", "Go into afk, so nobody will disturb you");
        embed.addField(">serverinfo", "Give info about server")
        embed.addField(">deleterole @role", "Deletes mentioned role")
        embed.addField(">addrole name color", "Creates a role with given hex color")
        embed.addField(">announce #channel message", "Send a message to given channel")
        embed.addField(">roleinfo @role", "Give info about given role")
        // embed.addField(">daily", "Command for daily currency")
        embed.addField(">profile @user", "Check this user profile")
        embed.addField(">profileadd {field_title} {content}", "Add field to the profile")
        embed.addField(">hug @user", "Hug user")
        embed.addField(">kiss @user", "Kiss a user")
        embed.addField(">pat @user", "Pats a user")
        embed.addField(">lewd @user", "Lewds a user")
        msg.channel.send(embed);

    }
});

function mentioned(member){
    for(let i = 0; i < afk.length; i++){
        if(member === afk[i].member){
            return status;
        }
    }
    return "-1";
}

// function addPoints(member, points){
//     return new Promise(resolve =>{
//         points = Number.parseInt(points);
//         let ind = -1;
//         for(let i = 0; i < users.users.length; i++){
//             if(users.users[i].id === member.id){
//                 ind = i;
//             }
//         }
//         if(ind === -1){
//             users.users.push({
//                 id : member.id,
//                 currency : points,
//                 gainedPoints : false,
//                 profileFields : []
//             })
//             fs.writeFile("users.json", JSON.stringify(users, ' ', 2), function(err){
//                 if(err) console.log(err);
//             })
//         }
//         else{
//             users.users[ind].currency += points;
//         }
//         resolve(0);
//     })
// }

function getUser(id){
    for(let i = 0; i < users.users.length; i++){
        if(id === users.users[i].id){
            return i;
        }
    }
    return -1;
}