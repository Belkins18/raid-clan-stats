---
name: new_rotation
description: Update Raid Hydra newRotation data in src/data/index.ts from a weekly semicolon-delimited CSV export.
---

# New Rotation

Use this skill when the user asks to update `newRotation.id` and/or `newRotation.data` from a Raid Hydra CSV file, usually named like `27.05.26.csv`.

## Inputs

The user normally provides:

- The target `newRotation.id`, for example `20-05-2026_27-05-2026`.
- The CSV path, for example `C:\Users\Fujitsu\Desktop\Raid Hydra\27.05.26.csv`.

If the user only provides the CSV path, infer the end date from the filename and inspect the current `newRotation.id` before deciding whether the start date is obvious. If it is not obvious, ask a short clarification.

## CSV Mapping

Read the CSV with delimiter `;`.

Map columns exactly like this:

- `Name` -> `name`
- `Normal` -> `Normal`
- `Hard` -> `Hard`
- `Brutal` -> `Brutal`
- `Nightmare` -> `Nightmare`
- `KeyUsed` -> `keyUsed`

Do not copy `SumDamage`; the app calculates totals itself.

Keep all numeric values as numbers, not strings.

Preserve the row order from the CSV exactly. If players are added, removed, or reordered in the CSV, reflect that in `newRotation.data` without trying to restore an older order.

## Workflow

1. Inspect `src/data/index.ts` to confirm the current `newRotation` shape.
2. Read the CSV with PowerShell:

   ```powershell
   Import-Csv -LiteralPath '<CSV_PATH>' -Delimiter ';'
   ```

3. Count CSV lines and remember that total file lines include the header. The expected `data` count is `lineCount - 1`.
4. Generate object rows with:

   ```powershell
   Import-Csv -LiteralPath '<CSV_PATH>' -Delimiter ';' | ForEach-Object {
     $name = $_.Name -replace "'", "\'"
     "    { name: '$name', Normal: $($_.Normal), Hard: $($_.Hard), Brutal: $($_.Brutal), Nightmare: $($_.Nightmare), keyUsed: $($_.KeyUsed) },"
   }
   ```

5. Update only `src/data/index.ts`:

   - Set `newRotation.id` to the requested value.
   - Replace the full `newRotation.data` array with generated rows.
   - Remove the trailing comma from the final row if the local style omits it.
   - Leave exports and sorting logic unchanged.

6. Verify:

   - `Select-String ... -Pattern "name:" | Measure-Object` matches `CSV line count - 1`.
   - `newRotation.id` matches the requested period.
   - A few first, last, and notable rows from the CSV are present.

7. Run build through `cmd` on Windows to avoid PowerShell execution policy blocking `npm.ps1`:

   ```cmd
   cmd /c npm run build
   ```

   If build succeeds with only Vite chunk-size warnings, report success and mention the warning briefly.

## Response Style

Keep the final answer short:

- State that `src/data/index.ts` was updated.
- Mention the new `id`.
- Mention the number of player records.
- Mention whether build passed.
- Note any obvious CSV-driven player additions/removals only if relevant.
