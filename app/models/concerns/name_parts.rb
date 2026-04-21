module NameParts
  module_function

  def normalize(value)
    value.to_s.squish.presence
  end

  def join(first_name, last_name)
    [normalize(first_name), normalize(last_name)].compact.join(" ").presence
  end

  def split(value, fallback_first: nil)
    normalized = normalize(value)
    return [normalize(fallback_first), nil] if normalized.blank?

    parts = normalized.split(" ")
    return [parts.first, nil] if parts.one?

    [parts[0...-1].join(" "), parts.last]
  end

  def from_email(email, fallback_first: "Member")
    local_part = email.to_s.split("@").first.to_s.tr("._-", " ").squish
    split(local_part.titleize, fallback_first: fallback_first)
  end

  def initials(first_name, last_name, fallback: nil)
    initials = [normalize(first_name), normalize(last_name)].filter_map { |part| part.first }.join.upcase
    return initials.first(2) if initials.present?

    normalize(fallback)
      &.split(" ")
      &.filter_map { |part| part.first }
      &.join
      &.upcase
      &.first(2)
  end
end
