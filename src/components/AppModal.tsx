import { useEffect } from 'react';
import { Modal as RNModal, type ModalProps, Platform, StyleSheet, View } from 'react-native';

function WebModal({ visible, transparent, onRequestClose, children }: ModalProps) {
  useEffect(() => {
    if (!visible) return;
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onRequestClose?.(e as any);
    };
    document.addEventListener('keyup', onKeyUp);
    return () => document.removeEventListener('keyup', onKeyUp);
  }, [visible, onRequestClose]);

  if (!visible) return null;

  return (
    <View style={[StyleSheet.absoluteFill, styles.overlay, !transparent && styles.opaque]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { zIndex: 1000 },
  opaque: { backgroundColor: '#fff' },
});

// RN's web Modal portals to document.body with position:fixed, which always
// covers the real browser viewport — escaping the phone-frame simulator in
// app/_layout.tsx. Render a plain absolute-fill View instead so it stays
// nested in the (transformed) DOM tree and respects the frame.
export function AppModal(props: ModalProps) {
  return Platform.OS === 'web' ? <WebModal {...props} /> : <RNModal {...props} />;
}
