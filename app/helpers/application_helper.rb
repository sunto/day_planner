module ApplicationHelper
  def vite_manifest_available?(entrypoint)
    ViteRuby.instance.manifest.path_for(entrypoint)
    true
  rescue ViteRuby::MissingEntrypointError
    return false if Rails.env.test?

    raise
  end
end
