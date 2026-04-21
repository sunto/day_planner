ENV["BUNDLE_GEMFILE"] ||= File.expand_path("../Gemfile", __dir__)

node_version_file = File.expand_path("../.nvmrc", __dir__)
if File.exist?(node_version_file)
  node_version = File.read(node_version_file).strip
  node_bin = File.expand_path(".nvm/versions/node/#{node_version}/bin", Dir.home)

  if Dir.exist?(node_bin)
    path_parts = ENV.fetch("PATH", "").split(File::PATH_SEPARATOR)
    ENV["PATH"] = ([ node_bin ] + path_parts).uniq.join(File::PATH_SEPARATOR)
  end
end

require "bundler/setup" # Set up gems listed in the Gemfile.
require "bootsnap/setup" # Speed up boot time by caching expensive operations.
