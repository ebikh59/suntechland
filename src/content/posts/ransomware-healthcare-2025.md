---
title: "LockBit 4.0 Targets Australian Healthcare Sector in Coordinated Campaign"
excerpt: "A new LockBit 4.0 ransomware campaign has targeted at least eight Australian healthcare providers, encrypting patient records and demanding multi-million dollar ransoms."
date: 2025-06-15
category: threat-intelligence
tags: [ransomware, LockBit, healthcare, Australia, APT, incident-response]
author: SunTechLand Staff
featured: false
---

## Threat Summary

The **LockBit 4.0** ransomware group has launched a coordinated campaign against Australian healthcare organisations, successfully compromising at least **eight healthcare networks** across New South Wales, Victoria, and Queensland between June 1–14, 2025.

The attacks have resulted in the encryption of patient records, medical imaging systems, and hospital management software — disrupting patient care and forcing facilities to revert to manual paper-based processes.

## Attack Chain Analysis

Based on incident response reports from multiple affected organisations, the attack chain follows a consistent pattern:

### Initial Access
Attackers gained initial access through **phishing emails** targeting administrative staff, combined with exploitation of **unpatched VPN appliances** (specifically Fortinet FortiOS CVE-2024-47575).

### Lateral Movement
```
1. VPN/email compromise → domain foothold
2. BloodHound/SharpHound for AD enumeration
3. Kerberoasting for credential harvesting
4. Pass-the-hash / Pass-the-ticket to move laterally
5. Domain admin compromise within 48-72 hours
```

### Ransomware Deployment
LockBit 4.0 was deployed via GPO (Group Policy Objects) to maximise coverage across the network simultaneously, triggering encryption across all domain-joined endpoints at once.

## Demands and Data Exfiltration

LockBit has claimed to have exfiltrated **patient health records** prior to encryption, including:
- Medicare numbers
- Medical histories
- Prescription records
- Mental health records

Ransom demands range from **AUD $2.5M to $8M**, with a 72-hour deadline before threatened public data release.

## Recommended Defensive Actions

### Immediate (0-24 hours)
- Audit VPN and remote access logs for suspicious authentication
- Verify all Fortinet appliances are patched to the latest version
- Enable MFA on all remote access systems
- Review GPO modification events in Active Directory

### Short-term (1-2 weeks)
- Conduct a privileged account audit — remove unnecessary admin rights
- Verify offline backups are intact and untouched
- Deploy EDR on all endpoints if not already in place
- Run tabletop exercises for ransomware scenarios

### YARA Detection Rule
```yara
rule LockBit4_Indicator {
  strings:
    $ext = ".lockbit4" nocase
    $note = "LockBit 4.0" nocase
    $wallpaper = "lockbit-wallpaper" nocase
  condition:
    any of them
}
```

## Attribution

This campaign has been attributed with **high confidence** to the LockBit affiliate network, based on TTPs matching previous LockBit 3.0/4.0 intrusions tracked by multiple threat intelligence firms.

The Australian Cyber Security Centre (ACSC) has issued an advisory and is coordinating with affected organisations.

## Resources

- [ACSC Ransomware Guidance](https://www.cyber.gov.au/threats/types-threats/ransomware)
- [MITRE ATT&CK — LockBit](https://attack.mitre.org/software/S0372/)
- [No More Ransom Project](https://www.nomoreransom.org/)
