import './ExitModal.css';

export default function ExitModal({ onConfirm, onCancel }) {
  return (
    <div className="exit-modal-overlay" onClick={onCancel}>
      <div className="exit-modal" onClick={e => e.stopPropagation()}>
        <p className="exit-modal-text">정말 나가시겠습니까?</p>
        <div className="exit-modal-buttons">
          <button className="exit-modal-btn exit-modal-btn--cancel" onClick={onCancel}>
            계속하기
          </button>
          <button className="exit-modal-btn exit-modal-btn--confirm" onClick={onConfirm}>
            나가기
          </button>
        </div>
      </div>
    </div>
  );
}
