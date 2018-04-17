#!/usr/bin/env ruby

require 'pp'
require 'shellwords'

require 'commander/import'
require 'terminal-table'
require 'pastel'
require 'terrapin'

program :name, $0.split('commando-').last
program :version, '0.0.1'
program :description, 'Commando helper methods. Not called directly.'
program :help_formatter, :compact

@pastel = Pastel.new

def dump_options(options)
  rows = []
  options.__hash__.map { |k, v| rows << ["--#{k}",v] }
  puts Terminal::Table.new title: "Options", rows: rows
  puts
end

def command_header(c, options)
  heading("#{program(:name)}: #{c.name}")
  dump_options(options)
end

def padded(message)
  length = message.length + 4
  " " * length + "\n  #{message}  \n" + " " * length
end

def heading(message)
  puts @pastel.inverse(padded(message.upcase.gsub('-', ' ')))
  puts
end

def notice(message)
  puts @pastel.bright_blue(message)
  puts
end

def warning(message)
  puts @pastel.bright_yellow(message)
  puts
end

def success(message)
  puts @pastel.green(message)
  puts
end

def crash(message="Unrecoverable error")
  puts @pastel.bold.red("⚠️  #{message}")
  abort
end
