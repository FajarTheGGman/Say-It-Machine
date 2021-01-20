require('dotenv').config()
let loading = require("ora")
let ch = require('chalk')
let dc = require("discord.js")
let js = require('jsome')
let axios = require("axios")
let bcrypt = require('bcrypt')
let yosay = require('yosay')
let user = new dc.Client()


function banner(){

    console.log(yosay("Say It Machine"))
    console.log(ch.bgYellow("[ Version 1.0.0 ]\n"))

    js({
        "Coder": "FajarTheGGman",
        "Twitter": "@kernel024",
        "Instagram": "@FajarTheGGman",
        "Github": "FajarTheGGman"
    })

    console.log(ch.green("\n  [+] Logged as " + user.user.username))
    
    loading(ch.bgBlue("[ Bot is waking up... ]")).start()
}

user.on('ready', () => {
    banner()
})

user.on("message", (message) => {

    const argument = message.content.slice('#').trim().split(' ')

    if(message.content == "sup"){
        message.reply("Sup Dude...")
    }else if(message.content == "who are you ?"){
        message.reply("I'm a bot")
    }else if(argument[0] == "#subdomain"){
        axios("https://api.hackertarget.com/hostsearch/?q=" + argument[1]).then(result => {
            let subdomain = new dc.MessageEmbed().setTitle("[ Subdomain Scanner ]").setDescription(result.data)

            message.reply(subdomain).catch(err => {
                message.reply('[!] Error To Much Subdomain')
            })
        }).catch(err => {
            message.reply("[!] Invalid Domain")
        })
    }else if(argument[0] == "#nmap"){
        message.reply("[/] Please wait..")
        axios("https://api.hackertarget.com/nmap/?q=" + argument[1]).then(hasil => {
            let nmap = new dc.MessageEmbed().setTitle('[ Nmap Scanner ]').setDescription(hasil.data)

            message.reply(nmap)
        })
    }else if(argument[0] == "#geoip"){
        axios("https://api.hackertarget.com/geoip/?q=" + argument[1]).then(hasil => {
            let geoip = new dc.MessageEmbed().setTitle("[ IP Geolocation ]").setDescription(hasil.data)

            message.reply(geoip)
        })
    }else if(argument[0] == "#hash"){
        bcrypt.hash(argument[1], 10, (err, result) => {
            let hash = new dc.MessageEmbed().setTitle("[ Hash Encrypt (salted) ]").setDescription(result)
            message.reply(hash)
        })
    }else if(message.content == "channel"){
        let channel = new dc.MessageEmbed().setTitle("[ Channel Information :printer: ]").setDescription(`
           :arrow_forward: Name : ${message.channel.guild.name}
           :arrow_forward: Channel : ${message.channel.name}
           :arrow_forward: Total Member: ${message.channel.guild.memberCount}
           :arrow_forward: Server Region : ${message.channel.guild.region}
           :arrow_forward: Maximum Mmber : ${message.channel.guild.maximumMembers}
        `)

        message.reply(channel)
    }else if(argument[0] == "#subnet"){
        axios("https://api.hackertarget.com/subnetcalc/?q=" + argument[1]).then(result => {
            let subnet = new dc.MessageEmbed().setTitle("[ Subnet Calculator ]").setDescription(result.data)

            message.reply(subnet)
        })
    }else if(argument[0] == "#dnslookup"){
        axios("https://api.hackertarget.com/dnslookup/?q=" + argument[1]).then(result => {
            let dnslookup = new dc.MessageEmbed().setTitle("[ Dns Lookup ]").setDescription(result.data)

            message.reply(dnslookup)
        })
    }else if(message.content == "#help"){
        let help = new dc.MessageEmbed().setTitle("[ List Commands :computer: ]").setDescription(`
        { Scanning Commands }
        :arrow_forward: #hash 'yourtext' -> Generate Salted Hash
        :arrow_forward: #subnet 'domain' -> Caclculate Subnet
        :arrow_forward: #geoip 'yourip' -> Track IP Public Location
        :arrow_forward: #subdomain 'domain' -> Check Subdomain
        :arrow_forward: #dnslookup 'domain' -> Lookup for dns
        :arrow_forward: #nmap 'domain/ip' -> Port Scanning

        { Other Commands }
        :arrow_forward: channel -> See the channel information
        :arrow_forward: sup -> Say hi to bot
        :arrow_forward: who are you ? -> asking to bot

        `)

        message.reply(help)
    }
})

user.login(process.env.BOT_TOKEN)
