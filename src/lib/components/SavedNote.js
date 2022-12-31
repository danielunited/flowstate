import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNote, updateNote } from "../api";
import LocalEditor from "./LocalEditor";
import SaveButton from "./SaveButton";

export default function SavedNote() {
	const { id } = useParams();

	const [note, setNote] = useState();
	const [canEdit, setCanEdit] = useState(false);

	const editKey = localStorage.getItem(`note_${id}_edit_key`);

	useEffect(() => {
		if (!id) return;

		if (editKey != null) {
			setCanEdit(true);
		}

		getNote(id).then(data => {
			setNote(data.text);
		});
	}, [id]);

	if (!note) return null;

	return (
		<>
			<LocalEditor readOnly={!canEdit} defaultValue={note} onChange={setNote} />
			<div className="app-button-container">
				{canEdit && (
					<SaveButton
						onClick={() => {
							updateNote({ id, editKey, text: note });
						}}
					/>
				)}
			</div>
		</>
	);
}
