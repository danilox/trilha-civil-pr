console.error(
  [
    "LEGACY/DO NOT USE.",
    "Este importador pertence ao modelo antigo do Radar e não pode importar registration/full_name.",
    "Use scripts/import-pcpr-cloud-safe.mjs em DRY-RUN para validar a base pseudonimizada.",
  ].join("\n"),
);
process.exit(1);

