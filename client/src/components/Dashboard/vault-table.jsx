/* eslint-disable react/prop-types */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

// Expecting recents to be an array of objects,

export function VaultTable({ recents }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Problem</TableHead>
          <TableHead>Language</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recents.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">
              <a
                href={`https://leetcode.com/problems/${item.titleSlug}/description/`}
                target="_blank"
              >
                <div className="flex items-center gap-2">
                  <div>
                    <div className="font-medium">{item.title}</div>
                  </div>
                </div>
              </a>
            </TableCell>
            <TableCell>{item.lang}</TableCell>
            <TableCell>{item.statusDisplay}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
