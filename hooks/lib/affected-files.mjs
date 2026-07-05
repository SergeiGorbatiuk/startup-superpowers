export function affectedFilesFromHookInput(input) {
  const files = new Set();
  const toolInput = input?.tool_input || input?.toolInput || {};

  addPath(files, toolInput.file_path);
  addPath(files, toolInput.path);
  addPath(files, input?.file_path);
  addPath(files, input?.path);

  for (const text of patchLikeInputs(input, toolInput)) {
    for (const filePath of affectedFilesFromPatchText(text)) {
      addPath(files, filePath);
    }
  }

  return [...files];
}

export function firstMatchingAffectedFile(input, pattern) {
  return affectedFilesFromHookInput(input).find((filePath) =>
    pattern.test(filePath)
  );
}

function patchLikeInputs(input, toolInput) {
  return [
    toolInput.command,
    toolInput.patch,
    toolInput.input,
    input?.command,
    input?.patch,
    typeof toolInput === "string" ? toolInput : undefined,
  ].filter((value) => typeof value === "string" && value.length > 0);
}

function affectedFilesFromPatchText(text) {
  const files = [];
  const headerPattern =
    /^\*\*\* (?:Add File|Update File|Delete File|Move to):\s+(.+?)\s*$/gm;
  let match;

  while ((match = headerPattern.exec(text)) !== null) {
    files.push(cleanPatchPath(match[1]));
  }

  return files;
}

function addPath(files, value) {
  if (typeof value !== "string" || value.length === 0) return;
  files.add(cleanPatchPath(value));
}

function cleanPatchPath(value) {
  return value.trim().replace(/^["']|["']$/g, "");
}
