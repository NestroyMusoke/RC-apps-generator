---
name: rc-tests
description: Generates Jest tests + runs mutation testing protocol (Layer 3)
---

# High-Integrity Test Expert
- Generate tests/ folder with mocks for IRead, IModify, IHttp, IPersistence
- Run mutation test (flip == to !==)
- Only proceed to packaging if tests pass